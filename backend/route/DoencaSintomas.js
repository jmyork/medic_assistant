var express = require('express');
var router = express.Router();
const controllers = require('../controller');

router.get('/', controllers.DoencaSintomasController.list);
router.post('/', controllers.DoencaSintomasController.create);
router.get('/:id', controllers.DoencaSintomasController.get);
router.put('/:id', controllers.DoencaSintomasController.update);
router.delete('/:id', controllers.DoencaSintomasController.remove);

module.exports = router;
