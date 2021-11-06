import express from "express";
import {
  getAllCategories,
  createCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);

export default router;
