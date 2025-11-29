var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireMedico, requireAdmin, validateConsultaOwnershipAdvanced, requirePaciente } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Listar consultas (apenas médicos e admins)
router.get('/', authenticate, requireMedico, controllers.ConsultasController.list);

// Criar consulta (apenas pacientes)
router.post('/', authenticate, requirePaciente, controllers.ConsultasController.create);

// Obter relatórios validados (apenas médicos e admins)
// IMPORTANTE: Esta rota DEVE estar antes de /:id para não ser interceptada
router.get('/reports', authenticate, requireMedico, controllers.ConsultasController.getValidatedReports);
router.get('/reports/:id', authenticate, requireMedico, controllers.ConsultasController.getConsultaDetails);


// Obter consulta específica (autenticado)
router.get('/:id', authenticate, validateObjectId('id'), controllers.ConsultasController.get);

// Atualizar consulta (proprietário ou admin)
router.put('/:id', authenticate, validateObjectId('id'), validateConsultaOwnershipAdvanced, controllers.ConsultasController.update);

// Deletar consulta (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.ConsultasController.remove);

// Aprovar consulta (médico)
router.put('/:id/approve', authenticate, requireMedico, validateObjectId('id'), controllers.ConsultasController.approve);

// Cancelar consulta (proprietário ou admin)
router.put('/:id/cancel', authenticate, validateObjectId('id'), validateConsultaOwnershipAdvanced, controllers.ConsultasController.cancel);

// Marcar como realizada (médico ou admin)
router.put('/:id/mark-as-done', authenticate, requireMedico, validateObjectId('id'), controllers.ConsultasController.markAsDone);

// Diagnóstico (médico ou admin)
router.post('/:id/diagnose', authenticate, requireMedico, validateObjectId('id'), controllers.ConsultasController.diagnose);

module.exports = router;
