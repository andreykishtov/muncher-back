const locationController = require('../../../controllers/locations');

module.exports = router => {
  router
    .route('/')
    .get(locationController.getLocations)
    .post(locationController.addLocation)
    .put(() => false)
    .delete(() => false);

  router.route('/:homeId').get(locationController.getLocation);

  return router;
};
