import * as express from "express";
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
