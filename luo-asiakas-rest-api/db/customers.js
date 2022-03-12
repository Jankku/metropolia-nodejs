const db = require("./dbconfig");

const getAllCustomers = (req, res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) console.log(err);
        else res.json(result.rows);
    });
};

const getCustomerById = (req, res) => {
    const query = {
        text: "SELECT * FROM customers WHERE id = $1",
        values: [req.params.id],
    };

    db.query(query, (err, result) => {
        if (err) {
            return console.log("Error executing query", err.stack);
        } else {
            if (result.rows.length > 0) res.json(result.rows);
            else res.sendStatus(404);
        }
    });
};

const addCustomer = (req, res) => {
    const newCustomer = req.body;
    const query = {
        text: "INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)",
        values: [
            newCustomer.firstname,
            newCustomer.lastname,
            newCustomer.email,
            newCustomer.phone,
        ],
    };

    db.query(query, (err, result) => {
        if (err) {
            return console.error("Error executing query", err.stack);
        }
    });

    res.json(newCustomer);
};

const deleteCustomer = (req, res) => {
    const query = {
        text: "DELETE FROM customers WHERE id = $1",
        values: [req.params.id],
    };
    db.query(query, (err, result) => {
        if (err) {
            return console.error("Error executing query", err.stack);
        }
    });

    res.sendStatus(204);
};

const updateCustomer = (req, res) => {
    const editedCustomer = req.body;
    const query = {
        text: "UPDATE customers set firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5",
        values: [
            editedCustomer.firstname,
            editedCustomer.lastname,
            editedCustomer.email,
            editedCustomer.phone,
            req.params.id,
        ],
    };

    db.query(query, (err, res) => {
        if (err) {
            return console.error("Error executing query", err.stack);
        }
    });

    res.json(editedCustomer);
};

// Delete all customers
const deleteAllCustomers = () => {
    db.query("DELETE FROM customers", (err, res) => {
        if (err) return console.error("Error executing query", err.stack);
    });
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    deleteAllCustomers,
};
