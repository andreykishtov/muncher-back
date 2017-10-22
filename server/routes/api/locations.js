const router = require('express-promise-router')();

const locationController = require('../../controllers/locations');

router
  .route('/')
  .get(locationController.getLocations)
  .post(locationController.addLocation)
  .put(() => false)
  .delete(() => false);

router.route('/:homeId').get(locationController.getLocation);

module.exports = router;
