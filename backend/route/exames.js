var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.examesController.list);
router.post('/', controllers.examesController.create);
router.get('/:id', controllers.examesController.get);
router.put('/:id', controllers.examesController.update);
router.delete('/:id', controllers.examesController.remove);

module.exports = router;
