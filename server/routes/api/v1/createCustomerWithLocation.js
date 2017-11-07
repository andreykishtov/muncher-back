const createCustomer = require('../../../controllers/createCustomer/');
const router = require('express').Router();

router
    .route('/')
    .post(createCustomer.createCustomerWithLocation);

 module.exports = router
