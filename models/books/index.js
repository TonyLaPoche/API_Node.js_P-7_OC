import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  ratings: {
    type: Object,
    required: true,
  },
  averageRating: {
    type: Number,
    required: true,
  },
});

export const Book = mongoose.model("Book", bookSchema);
