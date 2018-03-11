const router = require('express').Router();
const controller = require('../controllers/pm_set_names');

router.get('/', controller.list);
router.get('/:pm_set_name_id', controller.detail);

module.exports = router;
