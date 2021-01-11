import express from "express";
import {
  authorizeController,
  createUser,
  getAllUsers,
  getUser,
  patchUser,
} from "../controllers/users";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getUser);
router.post("/", createUser);
router.patch("/:userId", auth, patchUser);

router.get("/authorize", authorizeController);
router.get("/all", auth, getAllUsers);

export default router;
