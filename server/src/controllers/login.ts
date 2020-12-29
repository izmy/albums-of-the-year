import * as express from "express";
import bcrypt from "bcrypt";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const loginFacebookController = async (
  req: express.Request,
  res: express.Response
) => {
  const { accessToken, userID } = req.body;

  try {
    const userDataResponse = await axios.get(
      `https://graph.facebook.com/${userID}`,
      {
        params: {
          fields: "email,name,picture",
          access_token: accessToken,
        },
      }
    );

    const { email, name, picture } = userDataResponse.data;
    const user = await User.findOne({ email });

    if (user !== null) {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY ?? ""
      );
      res.json({
        token,
        user: {
          _id: user._id,
          name,
          email,
          role: user.role,
          picture: picture.data.url,
        },
      });
    } else {
      const newUser = new User({ name, email, picture: picture.data.url });
      newUser.save((err, data) => {
        if (err) {
          return res.status(400).json({ error: "Something went wrong..." });
        }
        const token = jwt.sign(
          { _id: data._id },
          process.env.JWT_SECRET_KEY ?? ""
        );
        res.json({ token, user: { _id: newUser._id, name, email, picture } });
      });
    }
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
  }
};

export const loginController = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      return res
        .status(400)
        .json({ msg: `Uživatel s emailem "${email}" nenalezen.` });
    }

    if (user.password === undefined) {
      return res.status(400).json({ msg: `Přihlašte se přes Facebook.` });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ msg: `Zadané heslo je neplatné.` });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY ?? "");
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
  }
};
