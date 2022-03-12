const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

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

app.get("/hello", (req, res) => {
    res.render("hello", { firstname: "John", lastname: "Johnson" });
});

app.get("/movies", (req, res) => {
    res.render("movielist", { movies: movies });
});

app.get("/addmovie", (req, res) => {
    res.render("addmovie");
});

app.post("/addmovie", (req, res) => {
    const newMovie = {
        id: new Date().now,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
    };
    movies = [...movies, newMovie];
    res.redirect("/movies");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
