const express = require('express');
const { newOrder } = require('../controller/orderController');
const router = express.Router();
const { isAuthanticatedUser,authorizeRoles } = require('../middlewares/auth');



router.route('/order/new').post( isAuthanticatedUser,newOrder)


module.exports = router;