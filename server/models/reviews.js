const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: String,
  content: String,
  rating: Number,
  date: { type: Date, default: Date.now },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'location',
    required: true
  },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;
