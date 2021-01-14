import * as express from "express";
import Vote from "../models/vote.types";

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
      $unwind: {
        path: "$user",
      },
    },
    {
      $project: {
        type: 1,
        points: 1,
        artist: 1,
        album: 1,
        rank: 1,
        writeByUser: {
          $cond: {
            if: "$write",
            then: "$user.name",
            else: null,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          artist: "$artist",
          album: "$album",
          type: "$type",
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
        type: {
          $first: "$type",
        },
        writeByUser: {
          $push: "$writeByUser",
        },
      },
    },
    {
      $project: {
        type: 1,
        points: 1,
        artist: 1,
        album: 1,
        ranks: 1,
        writeByUser: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$writeByUser",
                as: "a",
                cond: { $ne: ["$$a", null] },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $sort: {
        points: -1,
        ranks: -1,
      },
    },
    {
      $project: {
        _id: 0,
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

export const getUsersVotesCount = async (
  req: express.Request,
  res: express.Response
) => {
  const votesCount = await Vote.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $group: {
        _id: {
          user: "$user.name",
          type: "$type",
        },
        user: {
          $first: "$user.name",
        },
        type: {
          $first: "$type",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: {
          user: "$user",
        },
        user: {
          $first: "$user",
        },
        votes: {
          $push: {
            type: "$type",
            count: "$count",
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
        user: 1,
      },
    },
  ]);

  res.json(votesCount);
};
