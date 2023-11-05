const express = require('express');
const { getAllProducts, CreateProduct } = require('../controller/productController');

const router = express.Router();

router.route('/product').get(getAllProducts)
router.route('/product/new').post(CreateProduct)



module.exports = router