const Review = require('../models/review');
const Locations = require('../models/locations');
const User = require('../models/users');

module.exports = {
  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find({}, '-__v');
      res.status(200).json(reviews);
    } catch (error) {
      res.send(error);
    }
  },
  addReview: async (req, res) => {
    if (!req.body.userId) {
      return res.status(200).json({ message: 'User id is mandatory' });
    }
    if (!req.body.location) {
      return res.status(200).json({ message: 'location id is mandatory' });
    }
    const newReview = new Review(req.body);
    try {
      const review = await newReview.save(); // wait for review to be saved
      const location = await Locations.findOne({ _id: req.body.location }); // find the location
      const user = await User.findOne({ _id: req.body.userId }); // find the user

      location.reviews.push(review._id); // push review into location array
      user.reviews.push(review._id); // push review into user array
      location.save(); // we dont need to wait for the save here as we dont use it after save
      user.save(); // we dont need to wait for the save here as we dont use it after save

      return res.status(200).json({ review, message: 'Review added Successfully' });
    } catch (error) {
      throw new Error(error);
    }
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.findById({ _id: req.params.reviewId }, '-__v');
      res.status(200).json(review);
    } catch (error) {
      res.send(error);
    }
  },
};
