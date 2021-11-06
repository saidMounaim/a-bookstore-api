import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    authors: [
      {
        fullName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
