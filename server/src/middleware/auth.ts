import * as express from "express";
import jwt from "jsonwebtoken";

interface VerifiedUserData {
  _id: string;
}

export type RequestWithVerifiedUserData = express.Request & {
  verifiedUser?: VerifiedUserData;
};

export const auth = async (
  req: RequestWithVerifiedUserData,
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

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY ?? ""
    ) as VerifiedUserData;

    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }

    req.verifiedUser = verified;
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
