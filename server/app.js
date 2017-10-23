const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const API_URL = require('./helpers/api');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost/airbnb-test', { useMongoClient: true });
} else {
    mongoose.connect('mongodb://localhost/airbnb', { useMongoClient: true });
}

const app = express();

if (!process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

app.use(cors());

// Routes
app.use(API_URL.v1.location, require(API_URL.v1.locationsRoute));
app.use(API_URL.v1.users, require(API_URL.v1.usersRoute));
app.use(API_URL.v1.reviews, require(API_URL.v1.reviewsRoute));

module.exports = app;
