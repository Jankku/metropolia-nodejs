const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: { type: String, required: true, maxlength: 100 },
    director: { type: String, required: true, maxlength: 100 },
    year: { type: Number, required: true },
});

module.exports = mongoose.model("Movie", MovieSchema);
