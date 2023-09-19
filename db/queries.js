module.exports = {
    getUserByEmail: `SELECT email FROM customers WHERE email = $1`,
    createUser: `INSERT INTO customers (email, full_name, password, created_on, user_type) 
                values($1, $2, $3, $4, $5)`,
    getUserInfo: `SELECT customer_id, email, password, full_name, user_type FROM customers 
                WHERE email = $1`,
    insertProductImages: `INSERT INTO product_images (product_id, data)
                            values($1, $2)`,
    insertProduct: `INSERT INTO products (name, description, price, category, quantity, is_active)
                    values($1, $2, $3, $4, $5, $6) RETURNING product_id`,
}