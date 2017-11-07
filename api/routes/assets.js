const
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers/assets');

router.get('/', controllers.list);
router.get('/:asset_id', controllers.detail);
router.post('/', controllers.create);
router.patch('/:asset_id', controllers.update);
router.get('/:asset_id/deactivate', controllers.deactivate);

module.exports = router;
