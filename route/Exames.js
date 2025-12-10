var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar exames (público)
router.get('/', controllers.ExamesController.list);

// Criar exame (admin)
router.post('/', authenticate, requireAdmin, controllers.ExamesController.create);

// Obter exame (público)
router.get('/:id', validateObjectId('id'), controllers.ExamesController.get);

// Atualizar exame (admin)
router.put('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.ExamesController.update);

// Deletar exame (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.ExamesController.remove);

module.exports = router;
