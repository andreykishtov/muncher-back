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
            const review = await newReview.save();
            const location = await Locations.findOne({ _id: req.body.location });
            const user = await User.findOne({ _id: req.body.userId });

            location.reviews.push(review._id);
            user.reviews.push(review._id);
            location.save();
            user.save();

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
    }
};
