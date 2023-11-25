const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder,  } = require('../controller/orderController');
const router = express.Router();
const { isAuthanticatedUser,authorizeRoles } = require('../middlewares/auth');



router.route('/order/new').post( isAuthanticatedUser,newOrder);
router.route('/order/:id').get( isAuthanticatedUser , getSingleOrder);
router.route('/orders/me').get(isAuthanticatedUser, myOrders);
//  Admin Route
router.route('/admin/orders').get(isAuthanticatedUser, authorizeRoles("admin"), getAllOrders);
router.route('/admin/order/:id').put(isAuthanticatedUser,authorizeRoles("admin"),updateOrderStatus);
router.route('/admin/order/:id').delete(isAuthanticatedUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;