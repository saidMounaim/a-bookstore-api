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

//@DESC Update User Profile
//@ROUTE /api/v1/auth/updateprofile
//@METHOD PUT
export const updateProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updateData = {
    name: req.body.name,
    email: req.body.email,
  };

  user = await User.findByIdAndUpdate(req.user.id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: user });
});

//@DESC Update Password
//@ROUTE /api/v1/auth/updatepassword
//@METHOD PUT
export const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword !== newPassword) {
    let user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const match = bcrypt.compareSync(oldPassword, user.password);

    if (!match) {
      res.status(401);
      throw new Error("Old password incorrect");
    }

    user.password = newPassword;
    await user.save();

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
  }
});

//@DESC Get Me
//@ROUTE /api/v1/auth/me
//@METHOD GET
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
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
