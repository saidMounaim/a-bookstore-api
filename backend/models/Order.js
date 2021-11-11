import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Book",
  },

  amount: {
    type: Number,
    required: true,
  },

  adresse: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
