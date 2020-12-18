import * as express from "express";
import mongodb from "mongodb";
import Vote from "../models/vote";

export const saveVotesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Vote.insertMany(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
  }
  // try {
  // validator.validate(req.body, votesSchema, { throwError: true });
  // sendToMongo(req.body);
  //   res.sendStatus(200);
  // } catch (error) {
  //   console.log(error);
  //   res.status(422).end("Invalid body format: " + error.message);
  // }
};

export const getAllVotesController = async (
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
      $project: {
        _id: 0,
        rank: 1,
        artist: 1,
        album: 1,
        write: 1,
        type: 1,
        voter: {
          $arrayElemAt: ["$user.name", 0],
        },
      },
    },
  ]);

  const uniqueVotes = votes.reduce((acc, curr) => {
    if (!acc[curr.album]) {
      acc[curr.album] = {
        artist: curr.artist,
        album: curr.album,
        type: curr.type,
        ranks: [curr.rank],
        wantsWrite: curr.write ? [curr.voter] : [],
      };
    } else {
      acc[curr.album] = {
        artist: curr.artist,
        album: curr.album,
        type: curr.type,
        ranks: [...acc[curr.album].ranks, curr.rank],
        wantsWrite: curr.write
          ? [...acc[curr.album].wantsWrite, curr.voter]
          : [...acc[curr.album].wantsWrite],
      };
    }
    return acc;
  }, {});

  const x = Object.values(uniqueVotes) as any[];

  const byType = x.reduce((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = [curr];
    } else {
      acc[curr.type] = [...acc[curr.type], curr];
    }

    return acc;
  }, {});

  res.json(byType);
};
