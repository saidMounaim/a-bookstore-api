import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";
import { ProtectMiddleware } from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(ProtectMiddleware, createCategory);
router
  .route("/:id")
  .put(ProtectMiddleware, updateCategory)
  .delete(ProtectMiddleware, deleteCategory);

export default router;
