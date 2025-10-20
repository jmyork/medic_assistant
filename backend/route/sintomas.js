var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/', controllers.sintomasController.list);
router.post('/', controllers.sintomasController.create);
router.get('/:id', controllers.sintomasController.get);
router.put('/:id', controllers.sintomasController.update);
router.delete('/:id', controllers.sintomasController.remove);

module.exports = router;
