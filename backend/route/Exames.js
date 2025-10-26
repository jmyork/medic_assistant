var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.ExamesController.list);
router.post('/', controllers.ExamesController.create);
router.get('/:id', controllers.ExamesController.get);
router.put('/:id', controllers.ExamesController.update);
router.delete('/:id', controllers.ExamesController.remove);

module.exports = router;
