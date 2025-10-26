var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.PacientesController.list);
router.post('/', controllers.PacientesController.create);
router.get('/:id', controllers.PacientesController.get);
router.put('/:id', controllers.PacientesController.update);
router.delete('/:id', controllers.PacientesController.remove);

module.exports = router;
