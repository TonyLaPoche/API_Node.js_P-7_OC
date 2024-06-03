import fs from "fs";
import { Book } from "../../models/books/index.js";

/**
 * @description ## Controller getBooks
 * Récupère tous les livres de la base de données
 * @param {*} req
 * @param {*} res
 */
export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};

/**
 * @description ## Controller getBook
 * Récupère un livre par son id dans la base de données et le renvoie
 * @param {*} req
 * @param {*} res
 */
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

/**
 * @description ## Controller getBestRatingBooks
 * Récupère les 3 meilleurs livres notés dans la base de données et les renvoie en réponse à la requête
 * @param {*} req
 * @param {*} res
 */
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

/**
 * @description ## Controller createBook
 * Crée un livre dans la base de données et le renvoie en réponse à la requête avec un message de succès
 * @param {*} req
 * @param {*} res
 */
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

/**
 * @description ## Controller updateBook
 * Met à jour un livre dans la base de données et le renvoie en réponse à la requête avec un message de succès ou un message d'erreur si le livre n'existe pas ou si l'utilisateur n'est pas l'auteur du livre. Si une nouvelle image est envoyée, supprime l'ancienne image du serveur et stocke la nouvelle image
 * @param {*} req
 * @param {*} res
 */
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

/**
 * @description ## Controller deleteBook
 * Supprime un livre de la base de données et le renvoie en réponse à la requête avec un message de succès ou un message d'erreur si le livre n'existe pas
 * @param {*} req
 * @param {*} res
 */
export const deleteBook = async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ _id: id })
    .then((book) => {
      const filename = book.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({ _id: id })
          .then(() => res.status(200).json({ message: "Book supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

/**
 * @description ## Controller setBookRating
 * Met à jour la note d'un livre dans la base de données et le renvoie en réponse à la requête avec un message de succès ou un message d'erreur si le livre n'existe pas ou si la note n'est pas valide
 * @param {*} req
 * @param {*} res
 */
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
