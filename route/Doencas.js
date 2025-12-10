var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar doenças (público)
router.get('/', controllers.DoencasController.list);

// Criar doença (admin)
router.post('/', authenticate, requireAdmin, controllers.DoencasController.create);

// Obter doença (público)
router.get('/:id', validateObjectId('id'), controllers.DoencasController.get);

// Atualizar doença (admin)
router.put('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.DoencasController.update);

// Deletar doença (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.DoencasController.remove);

module.exports = router;
