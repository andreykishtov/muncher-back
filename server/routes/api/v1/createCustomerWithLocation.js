const createCustomer = require('../../../controllers/createCustomer/');

module.exports = router => {
  router
    .route('/')
    .post(createCustomer.createCustomerWithLocation);

  return router;
};
