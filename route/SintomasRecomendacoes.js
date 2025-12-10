var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.SintomasRecomendacoesController.list);
router.post('/', controllers.SintomasRecomendacoesController.create);
router.get('/:id', controllers.SintomasRecomendacoesController.get);
router.put('/:id', controllers.SintomasRecomendacoesController.update);
router.delete('/:id', controllers.SintomasRecomendacoesController.remove);

module.exports = router;
