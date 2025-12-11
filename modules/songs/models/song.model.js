import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Song = mongoose.model("Song", SongSchema);

export default Song;

