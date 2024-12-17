import type * as express from "express";
import md5 from "md5";
import jwt from "jsonwebtoken";
import User from "../models/user.types";

export const loginController = async (
  req: express.Request,
  res: express.Response
) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });

    if (user === null) {
      return res
        .status(400)
        .json({ msg: `Uživatel s loginem "${login}" nenalezen.` });
    }

    const hashedPassword = md5(password);

    if (hashedPassword !== user.password) {
      return res.status(400).json({ msg: "Zadané heslo je neplatné." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY ?? "");
    return res.json({
      token,
      user: {
        _id: user._id,
        login: user.login,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
  }
};
