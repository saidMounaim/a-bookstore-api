import express from 'express';
import { getAllBooks, getSingleBook } from '../controllers/BookController.js';

const router = express.Router();


router.route("/").get(getAllBooks);
router.route("/:id").get(getSingleBook)


export default router;