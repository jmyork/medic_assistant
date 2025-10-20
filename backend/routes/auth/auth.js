const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth/authController');

// login doesn't require passport
router.post('/login', controller.login);

module.exports = router;
