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

export const getResults = async (
  req: express.Request,
  res: express.Response
) => {
  const votes = await Vote.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $group: {
        _id: {
          artist: "$artist",
          album: "$album",
        },
        artist: {
          $first: "$artist",
        },
        album: {
          $first: "$album",
        },
        ranks: {
          $push: "$rank",
        },
        points: {
          $sum: "$points",
        },
        voters: {
          $push: "$user",
        },
        type: {
          $first: "$type",
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        points: -1,
      },
    },
    {
      $group: {
        _id: "$type",
        type: {
          $first: "$type",
        },
        results: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  res.json(votes);
};

export const getUserVotesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.userId);
    const votes = await Vote.find({ userId });
    res.json(votes);
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
  }
};
