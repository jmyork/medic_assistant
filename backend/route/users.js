var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.usersController.list);
router.post('/', controllers.usersController.create);
router.get('/:id', controllers.usersController.get);
router.put('/:id', controllers.usersController.update);
router.delete('/:id', controllers.usersController.remove);

module.exports = router;
