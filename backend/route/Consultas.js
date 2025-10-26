var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.ConsultasController.list);
router.post('/', controllers.ConsultasController.create);
router.get('/:id', controllers.ConsultasController.get);
router.put('/:id', controllers.ConsultasController.update);
router.delete('/:id', controllers.ConsultasController.remove);

module.exports = router;
