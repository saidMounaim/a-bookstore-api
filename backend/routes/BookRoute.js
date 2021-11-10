import express from "express";
import {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  updateCoverBook,
} from "../controllers/BookController.js";
import { ProtectMiddleware } from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router.route("/").get(getAllBooks).post(ProtectMiddleware, createBook);
router
  .route("/:id")
  .get(getSingleBook)
  .put(ProtectMiddleware, updateBook)
  .delete(ProtectMiddleware, deleteBook);
router.route("/:id/cover").put(ProtectMiddleware, updateCoverBook);

export default router;
