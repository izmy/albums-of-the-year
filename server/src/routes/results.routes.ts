import express from "express";
import { getResults, getUsersVotesCount } from "../controllers/results";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getResults);
router.get("/users-votes-count", auth, getUsersVotesCount);

export default router;
