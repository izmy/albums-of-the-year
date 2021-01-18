import * as express from "express";
import mongoose from "mongoose";
import { RequestWithVerifiedUserData } from "../middleware/auth";
import Vote from "../models/vote.types";

export const saveVotesController = async (
  req: RequestWithVerifiedUserData,
  res: express.Response
) => {
  try {
    const userId = req.verifiedUser?._id;
    const types = (req.query?.types as string)?.split(",") ?? [];
    const userVotes = await Vote.find({ userId, type: { $in: types } });

    try {
      await Vote.deleteMany({ userId, type: { $in: types } });
      await Vote.insertMany(req.body);
      return res.sendStatus(200);
    } catch (err) {
      if (userVotes !== null) {
        await Vote.insertMany(userVotes);
      }
      return res
        .status(400)
        .json({ error: "Something went wrong, old votes was restored..." });
    }
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
};

export const getUserVotesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.userId);
    const types = (req.query?.types as string)?.split(",") ?? [];
    const votes = await Vote.find({ userId, type: { $in: types } });
    return res.json(votes);
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
};

export const getAllVotes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const votes = await Vote.find().sort({
      type: 1,
      artist: 1,
      album: 1,
      rank: 1,
    });
    return res.json(votes);
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
};

export const patchVote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Vote.updateOne({ _id: req.body.vote._id }, req.body.vote);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
};
