var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.ConsultaMedicamentosController.list);
router.post('/', controllers.ConsultaMedicamentosController.create);
router.get('/:id', controllers.ConsultaMedicamentosController.get);
router.put('/:id', controllers.ConsultaMedicamentosController.update);
router.delete('/:id', controllers.ConsultaMedicamentosController.remove);

module.exports = router;
