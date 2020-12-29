import * as express from "express";
import mongoose from "mongoose";
import Vote from "../models/vote";

export const saveVotesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.body.userId;
    const userVotes = await Vote.find({ userId });

    try {
      await Vote.deleteMany({ userId });
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
    const votes = await Vote.find({ userId });
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
    const votes = await Vote.find();
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
