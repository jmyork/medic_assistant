var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.ConsultaExamesController.list);
router.post('/', controllers.ConsultaExamesController.create);
router.get('/:id', controllers.ConsultaExamesController.get);
router.put('/:id', controllers.ConsultaExamesController.update);
router.delete('/:id', controllers.ConsultaExamesController.remove);

module.exports = router;
