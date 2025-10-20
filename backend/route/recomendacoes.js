var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.recomendacoesController.list);
router.post('/', controllers.recomendacoesController.create);
router.get('/:id', controllers.recomendacoesController.get);
router.put('/:id', controllers.recomendacoesController.update);
router.delete('/:id', controllers.recomendacoesController.remove);

module.exports = router;
