module.exports = {
    getUserByEmail: `SELECT email FROM customers WHERE email = $1`,
    createUser: `INSERT INTO customers (email, full_name, password, created_on) 
                values($1, $2, $3, $4)`,
    getUserInfo: `SELECT customer_id, email, password, full_name FROM customers 
                WHERE email = $1`,
    insertProductImages: `INSERT INTO product_images (product_id, data)
                            values($1, $2)`,
    insertProduct: `INSERT INTO products (name, description, price, category, quantity, is_active)
                    values($1, $2, $3, $4, $5, $6) RETURNING product_id`,
}