import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

// @DESC Get All Categories
// @ROUTE /api/categories
// @METHOD GET
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res
    .status(201)
    .json({ success: true, count: categories.length, data: categories });
});
