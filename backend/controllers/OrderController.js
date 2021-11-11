import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

// @DESC Get All Orders
// @ROUTE /api/orders
// @METHOD GET
export const getOrders = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("Not Authorize to access this route");
  }

  const orders = await Order.find({});

  res.status(201).json({ success: true, count: orders.length, data: book });
});
