import express from "express";
import {
  getAllVotesController,
  saveVotesController,
} from "../controllers/votes";

const router = express.Router();

router.post("/", saveVotesController);
router.get("/", getAllVotesController);

export default router;
