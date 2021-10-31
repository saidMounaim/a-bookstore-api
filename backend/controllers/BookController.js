import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

// @DESC Get All Books
// @ROUTE /api/books
// @METHOD GET
export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.status(201).json({ success: true, count: books.length, data: books });
});

// @DESC Get Single Book
// @ROUTE /api/books/:id
// @METHOD GET
export const getSingleBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book Not Found");
  }

  res.status(201).json({ success: true, data: book });
});

// @DESC Create Book
// @ROUTE /api/books
// @METHOD POST
export const createBook = asyncHandler(async (req, res) => {
  if (!req.files) {
    throw new Error("No files were uploaded.");
  }

  if (!req.files.cover.mimetype.startsWith("image")) {
    res.status(401);
    throw new Error("Please add image file");
  }

  if (!req.files.cover.size > process.env.FILE_UPLOAD_LIMIT) {
    res.status(401);
    throw new Error(
      `Please add a image less than ${process.env.FILE_UPLOAD_LIMIT}`
    );
  }

  let cover = req.files.cover;

  cover.mv(`${process.env.FILE_UPLOAD_PATH}/${cover.name}`, async (err) => {
    if (err) {
      res.status(401);
      throw new Error(err);
    }

    let book = await Book.create({
      title: req.body.title,
      description: req.body.description,
      cover: cover.name,
      authors: req.body.authors,
    });

    res.status(201).json({ success: true, data: book });
  });
});
