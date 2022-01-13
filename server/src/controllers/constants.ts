import * as express from "express";
import Constants from "../models/constants.types";

export const getConstants = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const constants = await Constants.find();
    return res.json(constants[0]);
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
};
