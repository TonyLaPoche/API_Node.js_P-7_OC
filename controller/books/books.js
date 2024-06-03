import fs from "fs";
import { Book } from "../../models/books/index.js";

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};

export const getBook = async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ _id: id })
    .then((book) => {
      res.send(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getBestRatingBooks = async (req, res) => {
  await Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => {
      res.send(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const createBook = async (req, res) => {
  const bodyBook = JSON.parse(req.body.book);
  delete bodyBook._id;
  delete bodyBook._userId;

  const ref = req.book.name;
  const book = new Book({
    ...bodyBook,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${ref}.webp`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Book crée !", book }))
    .catch((error) => res.status(400).json({ error }));
};

export const updateBook = async (req, res) => {
  const id = req.params.id;
  const link = req.book;
  const { body } = req;

  const hasFiles = !!req.file;

  if (hasFiles) {
    Book.findOne({ _id: id })
      .then((book) => {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });

    await Book.updateOne({ _id: id }, { ...body, imageUrl: `${req.protocol}://${req.get("host")}/images/${link.name}.webp` })
      .then(() => {
        res.status(200).json({ message: "Book modifié ! et image également !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    await Book.updateOne(
      { _id: id },
      {
        ...body,
        _id: id,
      }
    )
      .then(() => {
        res.status(200).json({ message: "Book modifié !" });
      })
      .catch((error) => {
        res.status(400).json({ error, message: "Une erreur est survenu" });
      });
  }
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ _id: id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer ce livre !" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: id })
            .then(() => res.status(200).json({ message: "Book supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
export const setBookRating = async (req, res) => {
  const id = req.params.id;
  const rating = req.body.rating;
  const userId = req.auth.userId;
  await Book.findOne({ _id: id })
    .then((book) => {
      const index = book.ratings.findIndex((rating) => rating.userId === userId);
      if (index === -1) {
        book.ratings.push({ userId, grade: rating });
      } else {
        book.ratings[index].grade = rating;
      }
      book
        .save()
        .then((bookSaved) => {
          res.send(bookSaved);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
