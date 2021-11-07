import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
