import asyncHandler from "express-async-handler";
import Book from '../models/Book.js';

// @DESC Get All Books
// @ROUTE /api/books
// @METHOD GET
export const getAllBooks = asyncHandler(async (req, res) => {

    const books = await Book.find({});
    res.status(201).json({ success: true, count: books.length, data: books });

})