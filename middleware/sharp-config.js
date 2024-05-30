import sharp from "sharp";
import fs from "fs";
import path from "path";

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
