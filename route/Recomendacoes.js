var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireMedico, requireAdmin } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar recomendações (público)
router.get('/', controllers.RecomendacoesController.list);

// Criar recomendação (médico ou admin)
router.post('/', authenticate, requireMedico, controllers.RecomendacoesController.create);

// Obter recomendação (público)
router.get('/:id', validateObjectId('id'), controllers.RecomendacoesController.get);

// Atualizar recomendação (médico ou admin)
router.put('/:id', authenticate, requireMedico, validateObjectId('id'), controllers.RecomendacoesController.update);

// Deletar recomendação (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.RecomendacoesController.remove);

module.exports = router;
