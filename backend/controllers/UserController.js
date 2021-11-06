import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @DESC Get All Users
// @ROUTE /api/users
// @METHOD GET
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(201).json({ success: true, count: users.length, data: users });
});
