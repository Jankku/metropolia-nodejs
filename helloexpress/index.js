const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.get("/home/user", (req, res) => {
    res.json({ username: "Jankku" });
});

app.get("/about", (req, res) => {
    res.send("About us...");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
