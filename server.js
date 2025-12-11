import express from "express";
import mongoose from "mongoose";
import songRoutes from "./modules/songs/routes/songRoutes.js"; // your MongoDB route file
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.log(err));
// Sample Afrobeats data
const songs = [
  {
    id: 1,
    title: "Essence",
    artist: "Wizkid ft. Tems",
    year: 2020,
    genre: "Afrobeats"
  },
  {
    id: 2,
    title: "Peru",
    artist: "Fireboy DML",
    year: 2021,
    genre: "Afrobeats"
  },
  {
    id: 3,
    title: "STRONGER",
    artist: "Drae Ttw",
    year: 2025,
    genre: "Afrobeats"
  }
];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Afrobeats Music Library API!");
});

app.use("/songs", songRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
import connectDB from "./shared/middlewares/connect-db.js";

