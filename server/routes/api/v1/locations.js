const locationController = require('../../../controllers/locations');
const router = require('express').Router();

  router
    .route('/')
    .get(locationController.getLocations)
    .post(locationController.addLocation)
    .put(() => false)
    .delete(() => false);

  router
    .route('/:homeId').get(locationController.getLocation);

    module.exports = router;

