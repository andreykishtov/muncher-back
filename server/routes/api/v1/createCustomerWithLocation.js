const locationController = require('../../../controllers/createCustomer/index');

module.exports = router => {
  router
    .route('/')
    .post(locationController.addLocation);

  return router;
};
