import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";

// @DESC Get All Books
// @ROUTE /api/books
// @METHOD GET
export const getAllBooks = asyncHandler(async (req, res) => {
  let books;
  if (req.query.title && req.query.title !== "") {
    books = await Book.find({
      title: { $regex: ".*" + req.query.title + ".*" },
    });
  } else {
    books = await Book.find({});
  }
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

// @DESC Update Book By ID
// @ROUTE /api/books/:id
// @METHOD PUT
export const updateBook = asyncHandler(async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    res.status(401);
    throw new Error("Book not found");
  }

  book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      authors: req.body.authors,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(201).json({ success: true, data: book });
});

// @DESC Delete Book By ID
// @ROUTE /api/books/:id
// @METHOD DELETE
export const deleteBook = asyncHandler(async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    res.status(401);
    throw new Error("Book not found");
  }

  book = await Book.findByIdAndDelete(req.params.id);

  res.status(201).json({ success: true, data: {} });
});

// @DESC Update Cover Book
// @ROUTE /api/books/:id/cover
// @METHOD PUT
export const updateCoverBook = asyncHandler(async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    res.status(401);
    throw new Error("Book not found");
  }

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

    book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        cover: cover.name,
      },
      { new: true, runValidators: true }
    );

    res.status(201).json({ success: true, data: book });
  });
});
