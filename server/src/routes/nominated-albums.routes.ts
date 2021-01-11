import express from "express";
import { getNominatedAlbums } from "../controllers/nominated-albums";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getNominatedAlbums);

export default router;
