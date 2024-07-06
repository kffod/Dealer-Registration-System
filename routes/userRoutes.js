const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User login route
router.get('/login', userController.getLoginPage);
router.post('/login', userController.postLogin);


// Apply the middleware to the update-details route
router.get('/update-details', userController.extractUserIdFromToken, userController.getUpdateDetailsPage);
router.post('/update-details', userController.postUpdateDetails);
router.get('/forgot_password', userController.forgotPassword);
router.post('/forgot_password', userController.sendPasswordResetEmail);
module.exports = router;
