import express from "express";
import { getConstants } from "../controllers/constants";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getConstants);

export default router;
