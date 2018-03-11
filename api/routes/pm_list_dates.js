const router = require('express').Router();
const controller = require('../controllers/pm_list_dates');

router.get('/', controller.list);
router.get('/:rule_id', controller.detail);

module.exports = router;
