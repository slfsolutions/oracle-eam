const router = require('express').Router();

router.use('/asset_areas', require('./asset_areas'));
router.use('/asset_categories', require('./asset_categories'));
router.use('/assets', require('./assets'));
router.use('/departments', require('./departments'));
router.use('/organizations', require('./organizations'));

module.exports = router;
