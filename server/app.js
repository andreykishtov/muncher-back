const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/airbnb-test', { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/airbnb', { useMongoClient: true });
}

// / Initialize Application
const app = express();
// if (!process.env.NODE_ENV === 'test') {
// }
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/api/locations', require('./routes/api/locations'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/review', require('./routes/api/review'));

module.exports = app;
