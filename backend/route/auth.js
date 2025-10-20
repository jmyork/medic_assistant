var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

// POST /api/auth/login { email, password }
router.post('/login', controllers.authController.login);
// POST /api/auth/logout
router.post('/logout', controllers.authController.logout);
// POST /api/auth/request-password-reset { email }
router.post('/request-password-reset', controllers.authController.requestPasswordReset);
// POST /api/auth/reset-password { token, password }
router.post('/reset-password', controllers.authController.resetPassword);

module.exports = router;
