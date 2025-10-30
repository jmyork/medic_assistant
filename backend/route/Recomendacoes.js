var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.RecomendacoesController.list);
router.post('/', controllers.RecomendacoesController.create);
router.get('/:id', controllers.RecomendacoesController.get);
router.put('/:id', controllers.RecomendacoesController.update);
router.delete('/:id', controllers.RecomendacoesController.remove);

module.exports = router;
