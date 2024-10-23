const express = require('express');
const { signup, login } = require('../controller/userController');
const router = express.Router();

// Signup route
router.post('/signup',signup);
router.post('/login',login);

module.exports = router;
