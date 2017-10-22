const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const API_URL = require('./helpers/api')

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
app.use(API_URL.location, require(`./routes${API_URL.location}`));
app.use(API_URL.users, require(`./routes${API_URL.users}`));
app.use(API_URL.reviews, require(`./routes${API_URL.reviews}`));

module.exports = app;
