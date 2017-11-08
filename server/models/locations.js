const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationsSchema = new Schema({
  name: String,
  type: String, //[takeaway,restaurant,delevaryOnly]
  generalDesc: String,
  imageUrl: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  address: {
    country: String,
    city: String,
    street: String,
    number: String,
    lat: Number,
    lng: Number
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review'
    }
  ]
});

const Location = mongoose.model('location', LocationsSchema);

module.exports = Location;
