import express from "express";
import { deleteDataController } from "../controllers/delete-data";

const router = express.Router();

router.post("/", deleteDataController);
router.post("/check", deleteDataController);

export default router;
