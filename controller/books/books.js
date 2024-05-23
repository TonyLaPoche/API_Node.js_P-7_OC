import { Book } from "../../models/books/index.js";

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};

export const getBook = async (req, res) => {
  const id = req.params.id;
  res.send("renvoie tout le book avec l'id " + id);
};

export const getBestRatingBooks = async (req, res) => {
  // appeler la fonction qui renvoie les 3 books avec la meilleur note
  res.send("renvoie tout les books avec la meilleur note");
};

export const createBook = async (req, res) => {
  console.log("req.body", req.body);
  delete req.body._id;
  const book = new Book({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Book crée !", book }))
    .catch((error) => res.status(400).json({ error }));
};

export const updateBook = async (req, res) => {
  const id = req.params.id;
  res.send("update le book avec l'id " + id);
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  book
    .delete()
    .then(() => res.status(200).json({ message: "Book supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
export const setBookRating = async (req, res) => {
  const id = req.params.id;
  res.send("set la note du book avec l'id " + id);
};
