import fs from "fs";
import path from "path";

const filePath = path.resolve("./data/songs.json");  // ensures correct absolute path

export function getAllSongs() {
  const data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

export function getSongById(id) {
  const data = JSON.parse(fs.readFileSync(filePath));
  return data.find(song => song.id === parseInt(id));
}

export function addNewSong(song) {
  const data = JSON.parse(fs.readFileSync(filePath));
  song.id = data.length + 1;
  data.push(song);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return song;
}

export function updateSong(id, updatedSong) {
  const data = JSON.parse(fs.readFileSync(filePath));
  const index = data.findIndex(s => s.id === parseInt(id));
  if (index === -1) return null;
  data[index] = { ...data[index], ...updatedSong };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data[index];
}

export function deleteSong(id) {
  const data = JSON.parse(fs.readFileSync(filePath));
  const index = data.findIndex(s => s.id === parseInt(id));
  if (index === -1) return null;
  const deleted = data.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return deleted[0];
}

