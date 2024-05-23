import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  userId: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  ratings: {
    type: Object,
    required: false,
  },
  averageRating: {
    type: Number,
    required: false,
  },
});

export const Book = mongoose.model("Book", bookSchema);
