export const getBooks = async (req, res) => {
  res.send("renvoie tout les books");
};

export const getBook = async (req, res) => {
  const id = req.params.id;
  res.send("renvoie tout le book avec l'id " + id);
};

export const getBestRatingBooks = async (req, res) => {
  // appeler la fonction qui renvoie les 3 books avec la meilleur note
  res.send("renvoie tout les books avec la meilleur note");
};

export const createBook = async (req, res) => {
  res.send("créer un book");
};

export const updateBook = async (req, res) => {
  const id = req.params.id;
  res.send("update le book avec l'id " + id);
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;
  res.send("delete le book avec l'id " + id);
};
export const setBookRating = async (req, res) => {
  const id = req.params.id;
  res.send("set la note du book avec l'id " + id);
};
