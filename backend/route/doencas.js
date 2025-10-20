var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.doencasController.list);
router.post('/', controllers.doencasController.create);
router.get('/:id', controllers.doencasController.get);
router.put('/:id', controllers.doencasController.update);
router.delete('/:id', controllers.doencasController.remove);

module.exports = router;
