import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { ProtectMiddleware } from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .put(ProtectMiddleware, updateUser)
  .delete(ProtectMiddleware, deleteUser);

export default router;
