var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireAdmin, validateResourceOwnership } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar médicos (público)
router.get('/', controllers.MedicosController.list);

// Criar médico (admin)
router.post('/', authenticate, requireAdmin, controllers.MedicosController.create);

// Obter médico (público)
router.get('/:id', validateObjectId('id'), controllers.MedicosController.get);

// Atualizar médico (proprietário ou admin)
router.put('/:id', authenticate, validateObjectId('id'), validateResourceOwnership('Medicos', '_id'), controllers.MedicosController.update);

// Deletar médico (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.MedicosController.remove);

module.exports = router;
