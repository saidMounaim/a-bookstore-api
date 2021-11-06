import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;
