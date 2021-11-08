import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

// @DESC Login User
// @ROUTE /api/auth
// @METHOD POST
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("email dosen't exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("password incorrect");
  }
});

// @DESC Register User
// @ROUTE /api/auth/register
// @METHID POST
export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await User.create({ fullName, email, password });

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    },
  });
});
