const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../db/users");
const bcrypt = require("bcrypt");

// User login
const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    getUserByEmail(email, (user) => {
        if (user.length > 0) {
            console.log("login called");
            const hashpwd = user[0].password;
            const token = jwt.sign({ userId: email }, process.env.SECRET_KEY);

            if (bcrypt.compareSync(password, hashpwd)) res.send({ token });
            else res.sendStatus(400).end();
        } else {
            res.sendStatus(400).end();
        }
    });
};

// User authentication
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        res.sendStatus(400).end();
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) res.sendStatus(400).end();
        else next();
    });
};

module.exports = {
    authenticate,
    login,
};
