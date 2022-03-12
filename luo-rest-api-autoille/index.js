const express = require("express");
const mongoose = require("mongoose");
const mongoUrl = "";
const db = mongoose.connection;
const routes = require("./routes");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", routes);

mongoose.connect(mongoUrl, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
