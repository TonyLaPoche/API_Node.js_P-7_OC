import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/users/index.js";

/**
 * @description ## Controller signup
 * Crée un utilisateur dans la base de données et le renvoie en réponse à la requête avec un message de succès ou d'erreur.
 * @param {*} req
 * @param {*} res
 */
export const signup = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

/**
 * @description ## Controller login
 * Vérifie si l'utilisateur existe dans la base de données et si le mot de passe est correct. Si l'utilisateur existe et que le mot de passe est correct, renvoie un token d'authentification et l'identifiant de l'utilisateur en réponse à la requête. Si l'utilisateur n'existe pas ou que le mot de passe est incorrect, renvoie un message d'erreur.
 * @param {*} req
 * @param {*} res
 */
export const login = async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      return res.status(401).json({
        error: new Error("Utilisateur non trouvé !"),
      });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({
            error: new Error("Mot de passe incorrect !"),
          });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            {
              userId: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          ),
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};
