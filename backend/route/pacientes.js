var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.pacientesController.list);
router.post('/', controllers.pacientesController.create);
router.get('/:id', controllers.pacientesController.get);
router.put('/:id', controllers.pacientesController.update);
router.delete('/:id', controllers.pacientesController.remove);

module.exports = router;
