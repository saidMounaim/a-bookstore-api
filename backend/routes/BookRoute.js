import express from "express";
import {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  updateCoverBook,
} from "../controllers/BookController.js";

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getSingleBook).put(updateBook).delete(deleteBook);
router.route("/:id/cover").put(updateCoverBook);

export default router;
