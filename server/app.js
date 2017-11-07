const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const API_URL = require('./helpers/api')('v1');

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/muncher-test', { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/muncher', { useMongoClient: true });
}

const app = express();

if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

app.use(cors());

// Routes

app.use(API_URL.users, require(API_URL.usersRoute)(router));
app.use(API_URL.location, require(API_URL.locationsRoute)(router));
app.use(API_URL.reviews, require(API_URL.reviewsRoute)(router));
app.use(API_URL.createCustomerWithLocation, require(API_URL.createCustomerWithLocationRoute)(router));

module.exports = app;
