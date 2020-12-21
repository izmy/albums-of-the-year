import express from "express";
import {
  getResults,
  getUserVotesController,
  saveVotesController,
} from "../controllers/votes";

const router = express.Router();

router.post("/", saveVotesController);
router.get("/", getResults);
router.get("/:userId", getUserVotesController);

export default router;
