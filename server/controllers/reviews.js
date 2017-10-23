const Review = require('../models/review');
const Locations = require('../models/locations');
const User = require('../models/users');
const MESSAGES = require('../helpers/messages');

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
        const userId = req.body.userId;
        const location = req.body.location;
        if (!userId) {
            return res.status(200).json({ message: MESSAGES.USERID_REQUIRED });
        }
        if (!location) {
            return res.status(200).json({ message: MESSAGES.LOCATION_REQUIRED });
        }
        const newReview = new Review(req.body);
        try {
            const review = await newReview.save();
            const location = await Locations.findOne({ _id: location });
            const user = await User.findOne({ _id: userId });

            location.reviews.push(review._id);
            user.reviews.push(review._id);
            location.save();
            user.save();

            return res.status(200).json({ review, message: MESSAGES.REVIEW_SUCCESS });
        } catch (error) {
            throw new Error(error);
        }
    },
    getReview: async (req, res) => {
        try {
            const reviewId = req.params.reviewId;
            const review = await Review.findById({ _id: reviewId }, '-__v');
            res.status(200).json(review);
        } catch (error) {
            res.send(error);
        }
    }
};
