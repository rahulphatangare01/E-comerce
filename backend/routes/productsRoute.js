const express = require('express');
const { getAllProducts, CreateProduct, updateProduct, deleteProduct, getProductDetails, productReview, getProductReviews, deleteReview} = require('../controller/productController');
const { isAuthanticatedUser,authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/product').get(getAllProducts);
router.route('/product/new').post(isAuthanticatedUser, authorizeRoles("admin"),CreateProduct);
router.route('/product/:id').put(isAuthanticatedUser, authorizeRoles("admin"),updateProduct);
router.route('/product/:id').delete(isAuthanticatedUser, authorizeRoles("admin"),deleteProduct);
router.route('/product/:id').get(getProductDetails)

router.route('/review').put(isAuthanticatedUser,productReview );
router.route('/review').get(getProductReviews)
router.route('/review').delete(isAuthanticatedUser ,deleteReview);



module.exports = router;
