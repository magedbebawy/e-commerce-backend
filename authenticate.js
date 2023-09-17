const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

function authenticateToken(req, res, next) {
    console.log(req.body);
    const token = req.body.token;

    if (!token) return res.sendStatus(401);

    console.log(token);
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403); 
        } // if token is not valid
        req.user = user; 
        next(); // continue to the next middleware or route handler
    });
}

module.exports = authenticateToken;