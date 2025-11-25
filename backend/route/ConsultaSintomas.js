var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireMedico, requireAdmin, validateConsultaOwnershipAdvanced, requirePaciente } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar consultas (apenas médicos e admins)
router.get('/:id', authenticate, controllers.ConsultaSintomasController.list);
// router.get('/:id', authenticate, requireMedico, controllers.ConsultaSintomasController.list);

// Criar consulta (apenas admins)
router.post('/', authenticate, controllers.ConsultaSintomasController.create);

// Obter consulta específica (autenticado)
// router.get('/:id', authenticate, validateObjectId('id'), controllers.ConsultaSintomasController.get);


module.exports = router;
