import * as express from "express";
import Vote from "../models/vote";

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
