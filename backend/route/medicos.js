var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.medicosController.list);
router.post('/', controllers.medicosController.create);
router.get('/:id', controllers.medicosController.get);
router.put('/:id', controllers.medicosController.update);
router.delete('/:id', controllers.medicosController.remove);

module.exports = router;
