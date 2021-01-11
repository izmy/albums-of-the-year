import express from "express";
import {
  getAllVotes,
  getUserVotesController,
  patchVote,
  saveVotesController,
} from "../controllers/votes";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/", auth, saveVotesController);
router.get("/all", auth, getAllVotes);
router.patch("/update/:voteId", auth, patchVote);
router.get("/:userId", auth, getUserVotesController);

export default router;
