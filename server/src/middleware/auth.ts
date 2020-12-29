import * as express from "express";
import jwt from "jsonwebtoken";

export const auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY ?? "") as any;
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }

    req.body.userId = verified._id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
