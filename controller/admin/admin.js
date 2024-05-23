import { User } from "../../models/users/index.js";
import { Book } from "../../models/books/index.js";

export const clearAllBook = async (req, res) => {
  Book.deleteMany({})
    .then(() => {
      res.send("clear all book");
    })
    .catch((error) => {
      res.status(500).json({ error, message: "clear all book failed" });
    });
};

export const clearAllUser = async (req, res) => {
  User.deleteMany({})
    .then(() => {
      res.send("clear all user");
    })
    .catch((error) => {
      res.status(500).json({ error, message: "clear all user failed" });
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
