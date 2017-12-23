const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationsSchema = new Schema({
  name: String,
  type: String, //[takeaway,restaurant,delevaryOnly]
  generalDesc: String,
  imageUrl: String,
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
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

const Location = mongoose.model('location', LocationsSchema);

module.exports = Location;
