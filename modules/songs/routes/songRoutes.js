import express from "express";
import * as songModel from "../models/song.model.js";
import { validateSong } from "../middlewares/songValidator.js";

const router = express.Router();

// Get all songs
router.get("/", (req, res) => {
  const songs = songModel.getAllSongs();
  res.json(songs);
});

// Get a song by id
router.get("/:id", (req, res) => {
  const song = songModel.getSongById(req.params.id);
  if (!song) return res.status(404).json({ message: "Song not found" });
  res.json(song);
});

// Add a new song
router.post("/", validateSong, (req, res) => {
  const newSong = songModel.addNewSong(req.body);
  res.status(201).json(newSong);
});

// Update a song
router.put("/:id", validateSong, (req, res) => {
  const updated = songModel.updateSong(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Song not found" });
  res.json(updated);
});

// Delete a song
router.delete("/:id", (req, res) => {
  const deleted = songModel.deleteSong(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Song not found" });
  res.json(deleted);
});

export default router;

