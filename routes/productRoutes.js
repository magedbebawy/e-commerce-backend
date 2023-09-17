const router = require('express').Router();
const multer = require('multer');
const authenticateToken = require('../authenticate');
const { createProduct } = require('../controller/productController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createproduct', upload.array('images'), authenticateToken, createProduct);

module.exports = router;