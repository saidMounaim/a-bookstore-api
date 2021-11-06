import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").put(updateCategory);

export default router;
