const express = require('express');
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUser, getSingleUser, updateUserProfileRole, deleteUser} = require('../controller/userController');
const router = express.Router();
const {isAuthanticatedUser,authorizeRoles} = require('../middlewares/auth')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthanticatedUser, getUserDetails);
router.route('/password/update').put(isAuthanticatedUser, updatePassword);
router.route('/me/update').put(isAuthanticatedUser, updateUserProfile);

//  Admin routes
router.route("/admin/users").get(isAuthanticatedUser ,authorizeRoles("admin"),getAllUser);
router.route("/admin/user/:id").get(isAuthanticatedUser, authorizeRoles("admin"), getSingleUser);
router.route("/admin/user/:id").put(isAuthanticatedUser, authorizeRoles("admin"), updateUserProfileRole);
router.route("/admin/user/:id").delete(isAuthanticatedUser, authorizeRoles("admin"), deleteUser);



module.exports =router;
