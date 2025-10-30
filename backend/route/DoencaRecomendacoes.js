var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.DoencaRecomendacoesController.list);
router.post('/', controllers.DoencaRecomendacoesController.create);
router.get('/:id', controllers.DoencaRecomendacoesController.get);
router.put('/:id', controllers.DoencaRecomendacoesController.update);
router.delete('/:id', controllers.DoencaRecomendacoesController.remove);

module.exports = router;
