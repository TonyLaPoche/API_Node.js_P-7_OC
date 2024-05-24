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
  ratings: [
    {
      userId: {
        type: String,
        required: true,
      },
      grade: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
  averageRating: {
    type: Number,
    required: false,
  },
});

bookSchema.pre("save", async function () {
  if (this.ratings.length > 0) {
    const sumOfRatings = this.ratings.reduce((sum, rating) => sum + rating.grade, 0);
    this.averageRating = sumOfRatings / this.ratings.length;
  }
});

export const Book = mongoose.model("Book", bookSchema);
