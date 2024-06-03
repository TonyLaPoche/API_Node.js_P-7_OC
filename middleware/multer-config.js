import multer from "multer";

/**
 * @description Mime types des images acceptées
 */
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

/**
 * @description Stockage sur la mémoire ram pour le traitement de l'image
 */
const storage = multer.memoryStorage();

/**
 * @description ## Middleware upload
 * Configuration de multer pour l'upload des images, avec filtrage des types d'images acceptées
 * @param {Object} req - Requête du client au serveur express
 * @param {Object} file - Fichier image à uploader
 * @param {Function} cb - Callback
 * @returns {Function} cb - Callback
 */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (MIME_TYPES[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

export default upload;
