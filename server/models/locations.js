const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationsSchema = new Schema({
  title: String,
  type: String,
  generalDesc: String,
  guestAccess: String,
  owner: String,
  price: Number,
  currency: String,
  amenities: [
    {
      type: String,
    },
  ],
  imageUrl: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  address: {
    country: String,
    city: String,
    street: String,
    number: String,
    lat: Number,
    lng: Number,
  },
  theSpace: {
    description: String,
    guests: Number,
    beds: Number,
    bedrooms: Number,
  },
  occupancy: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
});

const location = mongoose.model('location', LocationsSchema);

module.exports = location;
