import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * @description ## Middleware sharpImages
 * Redimensionne l'image en 20% de sa taille d'origine.
 * Stocke l'image sous le nom de la date actuelle en timestamp et le nom du fichier d'origine sans extension.
 * Stocke l'image en webp. Stocke l'image dans le dossier images du serveur.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const sharpImages = async (req, res, next) => {
  try {
    fs.access("./images", (error) => {
      if (error) {
        fs.mkdirSync("./images");
      }
    });

    if (req.file) {
      const timestamp = new Date().getTime();
      const filenameWithoutExtension = path.basename(req.file.originalname, path.extname(req.file.originalname));
      const ref = `${timestamp}_${filenameWithoutExtension.split(" ").join("_")}`;
      req.book = {
        name: ref,
      };
      await sharp(req.file.buffer).toFormat("webp").webp({ quality: 20 }).toFile(`images/${ref}.webp`);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export default sharpImages;
