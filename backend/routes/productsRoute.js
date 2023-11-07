const express = require('express');
const { getAllProducts, CreateProduct, updateProduct, deleteProduct, getProductDetails  } = require('../controller/productController');
const { isAuthanticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/product').get(isAuthanticatedUser,getAllProducts);
router.route('/product/new').post(CreateProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').get(getProductDetails)




module.exports = router