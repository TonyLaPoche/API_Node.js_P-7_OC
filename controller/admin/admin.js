import { Book } from "../../models/books/index.js";
import { User } from "../../models/users/index.js";

export const clearAllUser = async (req, res) => {
  console.log("clear all user REQUEST");
  User.deleteMany({})
    .then(() => {
      res.send("clear all user");
    })
    .catch((error) => {
      res.status(500).json({ error, message: "clear all user failed" });
    });
};

export const clearAllBooks = async (req, res) => {
  await Book.deleteMany({})
    .then(() => {
      res.send("clear all user");
    })
    .cath((error) => {
      res.status(500).json({ error });
    });
};

export const getAllUser = async (req, res) => {
  await User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
