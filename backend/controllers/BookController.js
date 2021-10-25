import asyncHandler from "express-async-handler";
import Book from '../models/Book.js';

// @DESC Get All Books
// @ROUTE /api/books
// @METHOD GET
export const getAllBooks = asyncHandler(async (req, res) => {

    const books = await Book.find({});
    res.status(201).json({ success: true, count: books.length, data: books });

})

// @DESC Get Single Book
// @ROUTE /api/books/:id
// @METHOD GET
export const getSingleBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id);

    if(!book) {
        res.status(404);
        throw new Error("Book Not Found");
    }

    res.status(201).json({ success: true, data: book });

})