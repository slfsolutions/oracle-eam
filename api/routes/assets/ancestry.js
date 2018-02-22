const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/assets/ancestry');

router.get('/', controller.list);

module.exports = router;
