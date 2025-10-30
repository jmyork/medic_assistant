var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.SintomasController.list);
router.post('/', controllers.SintomasController.create);
router.get('/:id', controllers.SintomasController.get);
router.put('/:id', controllers.SintomasController.update);
router.delete('/:id', controllers.SintomasController.remove);

module.exports = router;
