import type * as express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { Role } from "../models/user.types";
import Constants from "../models/constants.types";
import type { RequestWithVerifiedUserData } from "../middleware/auth";

export const authorizeController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY ?? "") as {
      _id: string;
      iat: number;
    };
    if (!verified) return res.json(false);

    const constants = (await Constants.find())[0].toObject();

    const lastTokenResetDate = new Date(constants.lastTokenReset);
    const issuedAt = new Date(verified.iat * 1000);

    if (issuedAt.getTime() < lastTokenResetDate.getTime()) {
      return res.json(false);
    }

    const user = await User.findById({ _id: verified._id });
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const getUser = async (
  req: RequestWithVerifiedUserData,
  res: express.Response
) => {
  try {
    const user = await User.findById({ _id: req.verifiedUser?._id });

    return res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const getAllUsers = async (
  req: RequestWithVerifiedUserData,
  res: express.Response
) => {
  try {
    const user = await User.findById({ _id: req.verifiedUser?._id });

    if (user?.role.includes(Role.ADMIN)) {
      const users = await User.aggregate([
        {
          $project: {
            name: 1,
            email: 1,
            picture: 1,
            role: 1,
          },
        },
      ]);

      return res.json(users);
    }

    return res
      .status(401)
      .json({ msg: "Endpoint is only available to the admin." });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, name, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });

    if (emailExist !== null) {
      return res.status(400).json({ msg: "Účet s tímto emailem už existuje." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const role = [] as Role[];
    const newUser = new User({ name, email, password: hashedPassword, role });
    newUser.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: "Something went wrong..." });
      }
      const token = jwt.sign(
        { _id: data._id },
        process.env.JWT_SECRET_KEY ?? ""
      );
      return res.json({
        token,
        user: { _id: newUser._id, name, email, role },
      });
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const patchUser = async (
  req: RequestWithVerifiedUserData,
  res: express.Response
) => {
  const user = await User.findById({ _id: req.verifiedUser?._id });

  if (
    !req.body.hasOwnProperty("role") &&
    !req.body.hasOwnProperty("name") &&
    !req.body.hasOwnProperty("showVotes")
  ) {
    return res.status(401).json({
      msg: `It is possible to change the properties "name", "role" and "showVotes".`,
    });
  }

  if (req.body.role !== undefined) {
    if (!user?.role.includes(Role.ADMIN)) {
      return res
        .status(401)
        .json({ msg: "The roles can change just the admins." });
    }
  }

  try {
    const user = await User.findOne({ _id: req.params.userId });
    const newUser = { ...user!.toObject(), ...req.body };
    await User.updateOne({ _id: req.params.userId }, newUser);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
};
