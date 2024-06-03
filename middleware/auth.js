import jwt from "jsonwebtoken";

/**
 * @description ## Middleware auth
 * Vérifie si l'utilisateur est authentifié en vérifiant le token d'authentification. Si l'utilisateur est authentifié, stocke l'identifiant de l'utilisateur dans la requête.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};

export default auth;
