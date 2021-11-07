import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @DESC Get All Users
// @ROUTE /api/users
// @METHOD GET
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(201).json({ success: true, count: users.length, data: users });
});

// @DESC Craete New User
// @ROUTE /api/users
// @METHOD POST
export const createUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await User.create({ fullName, email, password });

  res.status(201).json({ success: true, data: user });
});

// @DESC Update User
// @ROUTE /api/users/:id
// @METHOD PUT
export const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { fullName, email, password } = req.body;

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      fullName,
      email,
      password,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({ success: true, data: user });
});

// @DESC Delete User
// @ROUTE /api/users/:id
// @METHOD DELETE
export const deleteUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  user = await User.findByIdAndDelete(req.params.id);

  res.status(201).json({ success: true, data: {} });
});
