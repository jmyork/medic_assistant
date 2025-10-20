var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.medicamentosController.list);
router.post('/', controllers.medicamentosController.create);
router.get('/:id', controllers.medicamentosController.get);
router.put('/:id', controllers.medicamentosController.update);
router.delete('/:id', controllers.medicamentosController.remove);

module.exports = router;
