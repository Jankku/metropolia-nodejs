const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

let movies = [
    {
        id: "1588323375416",
        title: "Star Wars: Episode IX - The Rise of Skywalker",
        year: 2019,
        director: "J.J. Abrams",
    },
    {
        id: "1588323390624",
        title: "The Irishman",
        year: 2019,
        director: "Martin Scorsese",
    },
    {
        id: "1588323412643",
        title: "Harry Potter and the Sorcerers Stone",
        year: 2001,
        director: "Chris Columbus",
    },
];

app.get("/api/movies", (req, res) => {
    res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
    const movieId = req.params.id;
    const movie = movies.filter((m) => m.id === movieId);
    if (movie.length > 0) {
        res.json(movie);
    } else {
        res.sendStatus(404);
    }
});

app.post("/api/movies", (req, res) => {
    const newMovie = { id: Date.now(), ...req.body };
    movies.push(newMovie);
    res.json(newMovie);
});

app.put("/api/movies/:id", (req, res) => {
    const id = req.params.id;
    const updatedMovie = { id: id, ...req.body };
    const index = movies.findIndex((m) => m.id === id);
    movies.splice(index, 1, updatedMovie);

    res.json(updatedMovie);
});

app.delete("/api/movies/:id", (req, res) => {
    const id = req.params.id;
    movies = movies.filter((m) => m.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
