var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.MedicamentosController.list);
router.post('/', controllers.MedicamentosController.create);
router.get('/:id', controllers.MedicamentosController.get);
router.put('/:id', controllers.MedicamentosController.update);
router.delete('/:id', controllers.MedicamentosController.remove);

module.exports = router;
