var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.consultasController.list);
router.post('/', controllers.consultasController.create);
router.get('/:id', controllers.consultasController.get);
router.put('/:id', controllers.consultasController.update);
router.delete('/:id', controllers.consultasController.remove);

module.exports = router;
