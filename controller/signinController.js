const bcrypt = require('bcrypt');
const pool = require('../db/db');
const {
    getUserByEmail,
    createUser
 } = require('../db/queries');


const signIn = (req, res) => {
    res.send('Hello from controller');
};

const signUp = async (req, res) => {
    try {
        const { email, full_name, password } = req.body;
        console.log(email, full_name, password);

        // check if email already exist in db
        const result = await pool.query(getUserByEmail, [email]);
        let exist = result.rows > 0 ? true : false;

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