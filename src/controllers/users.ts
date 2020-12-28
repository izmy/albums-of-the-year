import * as express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { Role } from "../models/user";

export const authorizeController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY ?? "") as any;
    if (!verified) return res.json(false);

    const user = await User.findById({ _id: verified._id });
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById({ _id: req.body.userId });

    return res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await User.findById({ _id: req.body.userId });

    if (user?.role.includes(Role.ADMIN)) {
      const users = await User.aggregate([
        {
          $project: {
            name: 1,
            email: 1,
          },
        },
      ]);

      return res.json(users);
    }

    return res
      .status(401)
      .json({ msg: "Endpoint is only available to the admin." });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password: hashedPassword });
      newUser.save((err, data) => {
        if (err) {
          return res.status(400).json({ error: "Something went wrong..." });
        }
        const token = jwt.sign(
          { _id: data._id },
          process.env.JWT_SECRET_KEY ?? ""
        );
        return res.json({ token, user: { _id: newUser._id, name, email } });
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
