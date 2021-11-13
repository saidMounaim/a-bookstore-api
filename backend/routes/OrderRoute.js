import express from "express";
import {
  getOrders,
  addOrder,
  getSingleOrder,
  updateOrder,
} from "../controllers/OrderController.js";
import { ProtectMiddleware } from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router.route("/").get(ProtectMiddleware, getOrders);
router
  .route("/:id")
  .get(ProtectMiddleware, getSingleOrder)
  .put(ProtectMiddleware, updateOrder);
router.route("/book/:bookID").post(ProtectMiddleware, addOrder);

export default router;
