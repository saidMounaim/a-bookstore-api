import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Book from "../models/Book.js";

// @DESC Get All Orders
// @ROUTE /api/orders
// @METHOD GET
export const getOrders = asyncHandler(async (req, res) => {
  if (req.user) {
    if (!req.user.isAdmin) {
      res.status(401);
      throw new Error("Not Authorize to access this route");
    }
  }

  const orders = await Order.find({});

  res.status(201).json({ success: true, count: orders.length, data: orders });
});

// @DESC Get Single Order By Logged User
// @ROUTE /api/orders/:id
// @METHOD POST
export const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  if (req.user._id.toString() !== order.user.toString()) {
    res.status(401);
    throw new Error("Not Authorize to access this route");
  }

  res.status(201).json({ success: true, data: order });
});

// @DESC Add Order
// @ROUTE /api/orders/book/:bookID
// @METHOD POST
export const addOrder = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.bookID);

  if (!book) {
    res.status(401);
    throw new Error("Book ID not found");
  }

  const checkOrder = await Order.findOne({ book: book._id });

  if (checkOrder) {
    res.status(401);
    throw new Error("This book already ordered");
  }

  const order = await Order.create({
    book: book._id,
    user: req.user._id,
    adresse: req.body.adresse,
    amount: req.body.amount,
  });

  res.status(201).json({ success: true, order });
});
