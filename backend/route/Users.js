var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.UsersController.list);
router.post('/', controllers.UsersController.create);
router.get('/:id', controllers.UsersController.get);
router.put('/:id', controllers.UsersController.update);
router.delete('/:id', controllers.UsersController.remove);

module.exports = router;
