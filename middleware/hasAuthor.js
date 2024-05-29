import { Book } from "../models/books/index.js";

const hasAuthor = (req, res, next) => {
  const id = req.params.id;
  Book.findOne({ _id: id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce livre !" });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export default hasAuthor;
