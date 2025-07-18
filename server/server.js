const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3001;


const movies = JSON.parse(fs.readFileSync("./server/movies_metadata.json"));


app.get("/api/movies", (req, res) => {
  const list = movies.map(m => ({
    id: m.id,
    title: m.title,
    tagline: m.tagline,
    vote_average: m.vote_average
  }));
  res.json(list);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (movie) res.json(movie);
  else res.status(404).send({ message: "Movie not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});