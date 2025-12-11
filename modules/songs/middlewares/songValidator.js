export function validateSong(req, res, next) {
  const { title, artist, year, genre } = req.body;
  if (!title || !artist || !year || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
}

