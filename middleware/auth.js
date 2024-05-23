import jwt from "jsonwebtoken";

export default (req, res, next) => {
  console.log("middleware/auth.js");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
