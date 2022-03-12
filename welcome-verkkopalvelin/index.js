const express = require("express");
const app = express();
const port = 3000;

app.get("/home/user/:name/:age", (req, res) => {
    if (req.params.age >= 18) {
        res.send(
            `Welcome ${req.params.name}, you're ${req.params.age} years old`
        );
    } else {
        res.send(`Hello ${req.params.name}, you're too young`);
    }
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
