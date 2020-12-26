import * as express from "express";
import mongoose from "mongoose";
import Vote from "../models/vote";

export const saveVotesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = mongoose.Types.ObjectId(req.body[0]?.userId);
    await Vote.deleteMany({ userId });
    await Vote.insertMany(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
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
