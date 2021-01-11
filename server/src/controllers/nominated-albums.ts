import * as express from "express";
import Vote from "../models/vote.types";

export const getNominatedAlbums = async (
  req: express.Request,
  res: express.Response
) => {
  const types = (req.query?.types as string)?.split(",") ?? [];
  const votes = await Vote.aggregate([
    {
      $match: {
        type: {
          $in: types,
        },
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
        countOfVoters: {
          $sum: 1,
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
        countOfVoters: -1,
      },
    },
    {
      $group: {
        _id: "$type",
        type: {
          $first: "$type",
        },
        results: {
          $push: {
            artist: "$artist",
            album: "$album",
            countOfVoters: "$countOfVoters",
          },
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
        type: 1,
      },
    },
  ]);

  res.json(votes);
};
