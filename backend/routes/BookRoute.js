import express from "express";
import {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/BookController.js";

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getSingleBook).put(updateBook).delete(deleteBook);

export default router;
