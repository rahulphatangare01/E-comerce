const express = require('express');
const { getAllProducts, CreateProduct, updateProduct, deleteProduct  } = require('../controller/productController');

const router = express.Router();

router.route('/product').get(getAllProducts);
router.route('/product/new').post(CreateProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);




module.exports = router