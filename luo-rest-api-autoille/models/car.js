const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: { type: String, required: true, maxlength: 100 },
    model: { type: String, required: true, maxlength: 100 },
    color: { type: String, required: true, maxlength: 100 },
    year: { type: Number, required: true },
});

module.exports = mongoose.model("Car", CarSchema);
