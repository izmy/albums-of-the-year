import express from "express";
import {
  getAllVotes,
  getResults,
  getUserVotesController,
  patchVote,
  saveVotesController,
} from "../controllers/votes";

const router = express.Router();

router.post("/", saveVotesController);
router.get("/", getResults);
router.get("/all", getAllVotes);
router.patch("/update/:voteId", patchVote);
router.get("/:userId", getUserVotesController);

export default router;
