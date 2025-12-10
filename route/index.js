var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({ message: 'API raiz - Medic Assistant' });
});

// montar rotas de recursos
router.use('/api/pacientes', require('./Pacientes'));
router.use('/api/medicos', require('./Medicos'));
router.use('/api/consultas', require('./Consultas'));
router.use('/api/consulta-sintomas', require('./ConsultaSintomas'));
router.use('/api/exames', require('./Exames'));
// router.use('/api/medicamentos', require('./Medicamentos'));
router.use('/api/doencas', require('./Doencas'));
// router.use('/api/recomendacoes', require('./Recomendacoes'));
router.use('/api/sintomas', require('./Sintomas'));
// NLP/matching route for symptom description -> suggested symptoms
router.use('/api/symptom-nlp', require('./SymptomNLP'));
router.use('/api/users', require('./Users'));
router.use('/api/auth', require('./Auth'));
// relational/resource association routes
// router.use('/api/consulta-exames', require('./ConsultaExames'));
router.use('/api/consulta-medicamentos', require('./ConsultaMedicamentos'));
router.use('/api/consulta-recomendacoes', require('./ConsultaRecomendacoes'));
router.use('/api/doenca-medicamentos', require('./DoencaMedicamentos'));
router.use('/api/doenca-recomendacoes', require('./DoencaRecomendacoes'));
router.use('/api/doenca-sintomas', require('./DoencaSintomas'));
router.use('/api/sintomas-medicamentos', require('./SintomasMedicamentos'));
router.use('/api/sintomas-recomendacoes', require('./SintomasRecomendacoes'));
module.exports = router;
