const express = require('express');
const { registerUser, loginUser } = require('../controllers/user-registration-and-login.controller');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;