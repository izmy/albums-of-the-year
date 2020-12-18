import express from "express";
import { getVotesFromMongoose } from "../controllers/users";

const router = express.Router();

router.get("/:uid/votes", async (req, res) => {
  const uid = Number(req.params.uid);
  const votes = await getVotesFromMongoose(uid);

  res.json(votes);
});

export default router;
