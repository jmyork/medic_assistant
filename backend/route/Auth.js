var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate } = require('../middleware/auth');

// POST /api/auth/login { email, password }
router.post('/login', controllers.AuthController.login);
// POST /api/auth/logout
router.post('/logout', controllers.AuthController.logout);
// POST /api/auth/request-password-reset { email }
router.post('/request-password-reset', controllers.AuthController.requestPasswordReset);
// POST /api/auth/reset-password { token, password }
router.post('/reset-password', controllers.AuthController.resetPassword);

router.get("/get-user-count", authenticate, controllers.UsersController.getUserCount);
router.get("/get-qtd-consultas", authenticate, controllers.UsersController.getQtdConsultas);
router.get("/get-qtd-consultas-mes", authenticate, controllers.UsersController.getQtdConsultasMes);

module.exports = router;
