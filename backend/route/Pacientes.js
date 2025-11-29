var express = require('express');
var router = express.Router();
const controllers = require('../controller');
const { authenticate, requireMedico, requireAdmin, validateResourceOwnership } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validators');

// Obter dados do paciente autenticado
router.get('/patient/details/:patientId?', authenticate, controllers.PacientesController.getPatientData);

// Obter histórico de sintomas do paciente autenticado
router.get('/patient/history/:patientId', authenticate, controllers.PacientesController.getPatientHistory);

// Listar pacientes (médicos e admins)
router.get('/', authenticate, requireMedico, controllers.PacientesController.list);

// Criar paciente (autenticado)
router.post('/', authenticate, controllers.PacientesController.create);

// Obter paciente por ID (autenticado)
router.get('/:id', authenticate, validateObjectId('id'), controllers.PacientesController.get);

// Atualizar paciente (proprietário ou admin)
router.put('/:id', authenticate, validateResourceOwnership("Pacientes", "user"), validateObjectId('id'), validateResourceOwnership('Pacientes', '_id'), controllers.PacientesController.update);

// Deletar paciente (admin)
router.delete('/:id', authenticate, requireAdmin, validateObjectId('id'), controllers.PacientesController.remove);

module.exports = router;
