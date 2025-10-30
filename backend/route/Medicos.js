var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.MedicosController.list);
router.post('/', controllers.MedicosController.create);
router.get('/:id', controllers.MedicosController.get);
router.put('/:id', controllers.MedicosController.update);
router.delete('/:id', controllers.MedicosController.remove);

module.exports = router;
