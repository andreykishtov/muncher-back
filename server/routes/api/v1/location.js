const locationController = require('../../../controllers/location');
const router = require('express').Router();

  router
    .route('/')
    .get(locationController.getAll)
    .post(locationController.addLocation)
    .put(() => false)
    .delete(() => false);

  router
    .route('/:id').get(locationController.getLocation);

    module.exports = router;

