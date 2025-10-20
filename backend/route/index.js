var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({ message: 'API raiz - Medic Assistant' });
});

// montar rotas de recursos
router.use('/api/pacientes', require('./pacientes'));
router.use('/api/medicos', require('./medicos'));
router.use('/api/consultas', require('./consultas'));
router.use('/api/exames', require('./exames'));
router.use('/api/medicamentos', require('./medicamentos'));
router.use('/api/doencas', require('./doencas'));
router.use('/api/recomendacoes', require('./recomendacoes'));
router.use('/api/sintomas', require('./sintomas'));
router.use('/api/users', require('./users'));
router.use('/api/auth', require('./auth'));

module.exports = router;
