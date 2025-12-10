var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.SintomasMedicamentosController.list);
router.post('/', controllers.SintomasMedicamentosController.create);
router.get('/:id', controllers.SintomasMedicamentosController.get);
router.put('/:id', controllers.SintomasMedicamentosController.update);
router.delete('/:id', controllers.SintomasMedicamentosController.remove);

module.exports = router;
