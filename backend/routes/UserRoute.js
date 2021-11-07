import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").put(updateUser);

export default router;
