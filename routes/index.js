import { Router } from "express";
import { login, signup } from "../controller/auth/authenticate.js";
import { createBook, deleteBook, getBestRatingBooks, getBook, getBooks, setBookRating, updateBook } from "../controller/books/books.js";
import { clearAllBook, clearAllUser, getAllUser } from "../controller/admin/admin.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer-config.js";

const routes = Router();

// public routes
routes.post("/auth/signup", signup);
routes.post("/auth/login", login);
routes.get("/books", getBooks);
routes.get("/books/bestrating", getBestRatingBooks);
routes.get("/books/:id", getBook);

// middleware auth
routes.post("/books", auth, upload, createBook);
routes.put("/books/:id", auth, updateBook);
routes.delete("/books/:id", auth, deleteBook);
routes.post("/books/:id/rating", auth, setBookRating);

// admin routes
routes.get("/users", getAllUser);
routes.delete("/users", clearAllUser);
routes.delete("/books", clearAllBook);

export default routes;
