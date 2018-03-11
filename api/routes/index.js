const router = require('express').Router();

router.use('/activity_operations', require('./activity_operations'));
router.use('/asset_routes', require('./asset_routes'));
router.use('/assets', require('./assets'));
router.use('/departments', require('./departments'));
router.use('/master_organizations', require('./master_organizations'));
router.use('/organizations', require('./organizations'));

router.use('/activity_attachments', require('./activity_attachments'));
router.use('/activity_causes', require('./activity_causes'));
router.use('/activity_operation_attachments', require('./activity_operation_attachments'));
router.use('/activity_sources', require('./activity_sources'));
router.use('/activity_types', require('./activity_types'));
router.use('/asset_areas', require('./asset_areas'));
router.use('/asset_attachments', require('./asset_attachments'));
router.use('/asset_categories', require('./asset_categories'));
router.use('/asset_criticalities', require('./asset_criticalities'));
router.use('/asset_statuses', require('./asset_statuses'));
router.use('/asset_types', require('./asset_types'));
router.use('/item_types', require('./item_types'));
router.use('/meters', require('./meters'));
router.use('/query', require('./query'));
router.use('/resources', require('./resources'));
router.use('/shutdown_types', require('./shutdown_types'));

module.exports = router;
