import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(mongooseUniqueValidator);

export const User = mongoose.model("User", userSchema);
