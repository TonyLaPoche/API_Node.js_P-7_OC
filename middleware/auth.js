import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("BEARER TOKEN -> ", token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken -> ", decodedToken);
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
