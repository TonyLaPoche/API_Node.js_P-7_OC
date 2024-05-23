import { Router } from "express";
import { login, signup } from "../controller/auth/authenticate.js";
import { createBook, deleteBook, getBestRatingBooks, getBook, getBooks, setBookRating, updateBook } from "../controller/books/books.js";
import { clearAllBook, clearAllUser, getAllUser } from "../controller/admin/admin.js";
import auth from "../middleware/auth.js";
import middlewareMulter from "../middleware/multer-config.js";

const routes = Router();

// public routes
routes.post("/auth/signup", signup);
routes.post("/auth/login", login);
routes.get("/books", getBooks);
routes.get("/books/:id", getBook);
routes.get("/books/best", getBestRatingBooks);

// middleware auth
routes.post("/books", auth, middlewareMulter, createBook);
routes.put("/books/:id", auth, updateBook);
routes.delete("/books/:id", auth, deleteBook);
routes.put("/books/:id/rating", auth, setBookRating);

// admin routes
routes.get("/users", getAllUser);
routes.delete("/users", clearAllUser);
routes.delete("/books", clearAllBook);

export default routes;
