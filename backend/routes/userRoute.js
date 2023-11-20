const express = require('express');
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails} = require('../controller/userController');
const router = express.Router();
const {isAuthanticatedUser,authorizeRoles} = require('../middlewares/auth')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthanticatedUser, getUserDetails)


module.exports =router;
