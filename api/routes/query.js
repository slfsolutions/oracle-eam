const router = require('express').Router();
const controller = require('../controllers/query');

router.post('/', controller.list);

module.exports = router;
