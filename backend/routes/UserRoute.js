import express from "express";
import { getAllUsers } from "../controllers/UserController.js";

const router = express.Router();

router.route("/").get(getAllUsers);

export default router;
