var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.ConsultaRecomendacoesController.list);
router.post('/', controllers.ConsultaRecomendacoesController.create);
router.get('/:id', controllers.ConsultaRecomendacoesController.get);
router.put('/:id', controllers.ConsultaRecomendacoesController.update);
router.delete('/:id', controllers.ConsultaRecomendacoesController.remove);

module.exports = router;
