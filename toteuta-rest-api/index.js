const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

let customers = [
    {
        id: "1588323375416",
        firstName: "John",
        lastName: "Johnson",
        email: "john@johnson.com",
        phone: "8233243",
    },
    {
        id: "1588323375417",
        firstName: "Mary",
        lastName: "Smith",
        email: "mary@smith.com",
        phone: "6654113",
    },
    {
        id: "1588323375418",
        firstName: "Peter",
        lastName: "North",
        email: "peter@north.com",
        phone: "901176",
    },
];

app.get("/api/customers", (req, res) => {
    res.json(customers);
});
app.get("/api/customers/:id", (req, res) => {
    const customer = customers.filter((c) => c.id === req.params.id);
    if (customer.length > 0) res.json(customer);
    else res.sendStatus(404);
});

app.post("/api/customers", (req, res) => {
    const newCustomer = { id: Date.now(), ...req.body };
    customers.push(newCustomer);
    res.json(newCustomer);
});

app.put("/api/customers/:id", (req, res) => {
    const updatedCustomer = { id: req.params.id, ...req.body };
    const index = customers.findIndex((m) => m.id === req.params.id);
    customers.splice(index, 1, updatedCustomer);
    res.json(updatedCustomer);
});

app.delete("/api/customers/:id", (req, res) => {
    customers = customers.filter((c) => c.id !== req.params.id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
