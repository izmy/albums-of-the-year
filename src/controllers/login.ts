import * as express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const loginController = async (
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
          id: user._id,
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
        res.json({ token, user: { id: newUser._id, name, email, picture } });
      });
    }
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
  }
};
