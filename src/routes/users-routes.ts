import express from "express";
import {
  authorizeController,
  getAllUsers,
  getUser,
} from "../controllers/users";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getUser);
router.get("/authorize", authorizeController);
router.get("/all", auth, getAllUsers);

export default router;
