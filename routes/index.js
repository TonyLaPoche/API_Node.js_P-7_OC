import { Router } from "express";
import { login, signup } from "../controller/auth/authenticate.js";
import { createBook, deleteBook, getBestRatingBooks, getBook, getBooks, setBookRating, updateBook } from "../controller/books/books.js";
import auth from "../middleware/auth.js";
import { clearAllBooks, clearAllUser, getAllUser } from "../controller/admin/admin.js";

const routes = Router();

routes.post("/auth/signup", signup);
routes.post("/auth/login", login);
routes.get("/books", getBooks);
routes.get("/books/:id", getBook);
routes.get("/books/best", getBestRatingBooks);
routes.post("/books", auth, createBook);
routes.put("/books/:id", auth, updateBook);
routes.delete("/books/:id", auth, deleteBook);
routes.put("/books/:id/rating", auth, setBookRating);

routes.get("/user", getAllUser);
routes.delete("/users/clears", clearAllUser);
routes.delete("/books/clears", clearAllBooks);

export default routes;
