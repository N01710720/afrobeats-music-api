import express from "express";

const app = express();
app.use(express.json());

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
  }
];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Afrobeats Music Library API!");
});

app.get("/songs", (req, res) => {
  res.json(songs);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

