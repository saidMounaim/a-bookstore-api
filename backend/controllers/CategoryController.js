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

// @DESC Create New Category
// @ROUTE /api/categories
// @METHOD POST
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  res.status(201).json({ success: true, data: category });
});

// @DESC Update Category
// @ROUTE /api/categories/:id
// @METHOD PUT
export const updateCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    res.status(401);
    throw new Error("Category nor found");
  }

  category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({ success: true, data: category });
});

// @DESC Delete Catagory
// @ROUTE /api/categories/:id
// @METHOD DELETE
export const deleteCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    res.status(401);
    throw new Error("Category nor found");
  }

  category = await Category.findByIdAndDelete(req.params.id);

  res.status(201).json({ success: true, data: {} });
});
