import express from 'express';
import { getAllBooks } from '../controllers/BookController.js';

const router = express.Router();


router.route("/").get(getAllBooks);


export default router;