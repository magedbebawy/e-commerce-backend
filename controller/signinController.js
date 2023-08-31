const bcrypt = require('bcrypt');
const pool = require('../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
    getUserByEmail,
    createUser,
    getUserInfo
 } = require('../db/queries');


const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // get emai and password from db
        const result = await pool.query(getUserInfo, [email]);
        if(result.rows.length == 0) {
            return res.status(409).json({
                message: "User doesn't exist",
                error: 'Request could not be completed'
            });
        }

        // compare passwords
        const passResult = await bcrypt.compare(password, result.rows[0].password);
        if(!passResult) {
            return res.status(401).json({
                message: "Invalid password",
                error: 'Unauthorized'
            });
        }

        // generate jwt
        const payload = {
            id: result.rows[0].customer_id,
            username: result.rows[0].full_name,
            role: 'user'
        }

        const secretKey = process.env.SECRETKEY;
        const options = {
            expiresIn: '1hr'
        };

        const token = jwt.sign(payload, secretKey, options);

        return res.status(200).json({
            message: 'User signed in successfully',
            token,
            error: null
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({
            message: 'Error while signing in', 
            error: 'Internal server error'
        });
    }
};

const signUp = async (req, res) => {
    try {
        const { email, full_name, password } = req.body;
        console.log(email, full_name, password);

        // check if email already exist in db
        const result = await pool.query(getUserByEmail, [email]);
        let exist = result.rows.length > 0 ? true : false;

        if(exist) {
            return res.status(409).json({
                message: 'Email already in use', 
                error: 'Request could not be completed'
            })
        }

        // encrypting password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const currentDate = new Date();

        // create new user
        await pool.query(createUser, [email, full_name, hashedPassword, currentDate]);

        return res.status(200).json({
            message: 'User created successfully', 
            error: null
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error while creating user', 
            error: 'Internal server error'
        });
    }
}

module.exports = { signIn, signUp };