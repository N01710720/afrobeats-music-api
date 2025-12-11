import { validateSong } from "../middlewares/songValidator.js";
import express from "express";
import Song from "../models/song.model.js";

const router = express.Routimport express from "express";
import Song from "../models/song.model.js";

const router = express.Router();

// GET all songs with optional search, sort, pagination
router.get("/", async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 10 } = req.query;

    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    let q = Song.find(query);

    if (sort) q = q.sort(sort);

    q = q.skip((page - 1) * Number(limit)).limit(Number(limit));

    const results = await q.exec();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single song by ID
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new song
router.post("/",validateSong, async (req, res) => {
  try {
    const newSong = new Song(req.body);
    const saved = await newSong.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update song by ID
router.put("/:id",validateSong, async (req, res) => {
  try {
    const updated = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE song by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Song.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Song not found" });
    res.status(200).json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

