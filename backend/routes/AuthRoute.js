import express from "express";
import { login, register } from "../controllers/AuthController.js";

const router = express.Router();

router.route("/").post(login);
router.route("/register").post(register);

export default router;
