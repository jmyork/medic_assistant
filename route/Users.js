var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireAdmin, validateResourceOwnership } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar users (admin)
router.get('/', authenticate, requireAdmin, controllers.UsersController.list);

// Criar user (público - registro)
router.post('/', controllers.UsersController.create);

// Obter user (autenticado)
router.get('/:id', authenticate, validateObjectId('id'), controllers.UsersController.get);

// Atualizar user (proprietário ou admin)
router.put('/:id', authenticate, validateObjectId('id'), validateResourceOwnership('Users', '_id'), controllers.UsersController.update);

// Mudar senha (autenticado)
router.put('/:id/change-password', authenticate, validateObjectId('id'), controllers.UsersController.changePassword);

// Deletar user (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.UsersController.remove);

module.exports = router;
