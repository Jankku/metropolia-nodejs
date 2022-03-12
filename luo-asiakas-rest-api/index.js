require("dotenv").config();
const express = require("express");
const app = express();
const query = require("./db/customers");
const auth = require("./services/authenticate");
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Customer API.");
});

// Login route
app.post("/login", auth.login);

// Routes for API
app.get("/api/customers", auth.authenticate, query.getAllCustomers);
app.get("/api/customers/:id", auth.authenticate, query.getCustomerById);
app.put("/api/customers/:id", auth.authenticate, query.updateCustomer);
app.post("/api/customers", auth.authenticate, query.addCustomer);
app.delete("/api/customers/:id", auth.authenticate, query.deleteCustomer);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

module.exports = app;
