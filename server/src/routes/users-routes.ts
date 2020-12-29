import express from "express";
import {
  authorizeController,
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/users";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getUser);
router.post("/", createUser);

router.get("/authorize", authorizeController);
router.get("/all", auth, getAllUsers);

export default router;
