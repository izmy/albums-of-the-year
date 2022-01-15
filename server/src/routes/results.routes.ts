import express from "express";
import {
  getResults,
  getResultsWithParams,
  getUsersResults,
  getUsersVotesCount,
} from "../controllers/results";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getResults);
router.get("/params", auth, getResultsWithParams);
router.get("/users-votes", auth, getUsersResults);
router.get("/users-votes-count", auth, getUsersVotesCount);

export default router;
