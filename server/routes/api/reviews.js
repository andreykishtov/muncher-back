const router = require('express-promise-router')();

const reviewController = require('../../controllers/reviews');

router
    .route('/')
    .get(reviewController.getReviews)
    .post(reviewController.addReview);

router
    .route('/:reviewId')
    .get(reviewController.getReview)
    .post(() => {})
    .put(() => {})
    .delete(() => {});

router.route('/:reviewId').get(reviewController.getReview);

module.exports = router;
