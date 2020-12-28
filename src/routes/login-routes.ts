import express from "express";
import { loginController, loginFacebookController } from "../controllers/login";

const router = express.Router();

router.post("/", loginController);
router.post("/facebook", loginFacebookController);

export default router;
