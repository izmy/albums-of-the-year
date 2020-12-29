import express from "express";
import { getResults } from "../controllers/results";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getResults);

export default router;
