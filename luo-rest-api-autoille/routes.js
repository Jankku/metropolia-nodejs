const express = require("express");
const router = express.Router();
const Car = require("./models/car");

// Fetch all cars
router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Add car
router.post("/cars", async (req, res) => {
    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
    });

    try {
        const savedCar = await car.save();
        res.status(201).json({ savedCar });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Update car by id
router.put("/cars/:id", async (req, res) => {
    await Car.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ result });
            }
        }
    );
});

// Delete car by Id
router.delete("/cars", async (req, res) => {
    await Car.deleteOne({ _id: req.body.id }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(result);
        }
    });
});

// Delete all cars
const deleteAllcars = () => {
    db.query("DELETE FROM cars", (err, result) => {
        if (err) return console.log("Error executing query", err.stack);
    });
};

module.exports = router;
