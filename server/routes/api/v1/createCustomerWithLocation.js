const createCustomer = require('../../../controllers/createCustomer/');
const router = require('express').Router();
const canCreateUser = require('../../../helpers/middleware/isAuthorizedToCreateCustomer');

router.route('/').post(canCreateUser, createCustomer.createCustomerWithLocation);

module.exports = router;
