var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar sintomas (público)
router.get('/', controllers.SintomasController.list);

// Criar sintoma (admin)
router.post('/', authenticate, requireAdmin, controllers.SintomasController.create);

// Obter sintoma (público)
router.get('/:id', validateObjectId('id'), controllers.SintomasController.get);

// Atualizar sintoma (admin)
router.put('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.SintomasController.update);

// Deletar sintoma (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.SintomasController.remove);

module.exports = router;
