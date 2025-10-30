var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.DoencaMedicamentosController.list);
router.post('/', controllers.DoencaMedicamentosController.create);
router.get('/:id', controllers.DoencaMedicamentosController.get);
router.put('/:id', controllers.DoencaMedicamentosController.update);
router.delete('/:id', controllers.DoencaMedicamentosController.remove);

module.exports = router;
