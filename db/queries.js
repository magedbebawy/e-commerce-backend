module.exports = {
    getUserByEmail: `SELECT email FROM customers WHERE email = $1`,
    createUser: `INSERT INTO customers (email, full_name, password, created_on) 
                values($1, $2, $3, $4)`,
    getUserInfo: `SELECT customer_id, email, password, full_name FROM customers 
                WHERE email = $1`,
}