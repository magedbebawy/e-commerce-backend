const pool = require('../db/db');
const {
    insertProductImages, 
    insertProduct,
} = require('../db/queries');


const createProduct = async (req, res) => {
        const errors = [];
        const {name, description, price, quantity, category} = req.body;
        if(!name || name.length < 7) {
            errors.push("Product name is required");
        }
        if(!description || description.length < 10) {
            errors.push("Product description is required");
        }
        if(!price) {
            errors.push("Product price is required");
        }
        if(!quantity) {
            errors.push("Product quantity is required");
        }
        if(!category || category.length < 3) {
            errors.push("Product category is required");
        }
        if(!req.files || req.files.length === 0) {
            errors.push("Product images are required");
        }

        if(errors.length > 0) {
            return res.status(400).json({
                error: "Bad request",
                message: errors
            });
        };

    try{
        const dbRes = await pool.query(insertProduct, [name, description, price, category, quantity, "true"]);

        await pool.query('BEGIN');
    
        const imagePromise = req.files.map(file => {
            console.log(file);
            return pool.query(insertProductImages, [dbRes.rows[0].product_id, file.buffer]);
        });

        console.log(imagePromise);

        await Promise.all(imagePromise);

        await pool.query('COMMIT');

        
        return res.status(200).json({
            error: null,
            message: "Product created successfully"
        });

    } catch (error) {

        console.log(error);
        await pool.query('ROLLBACK');

        return res.status(500).json({
            error: "Server error",
            message: "Error while creating product"
        });

    }
}

module.exports = {
    createProduct
}