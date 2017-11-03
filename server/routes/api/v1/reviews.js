const reviewController = require('../../../controllers/reviews');

module.exports = (router) => {
    router
        .route('/')
        .get(reviewController.getReviews)
        .post(reviewController.addReview);

    router
        .route('/:reviewId')
        .get(reviewController.getReview)
        .post(() => { })
        .put(() => { })
        .delete(() => { });

    router.route('/:reviewId').get(reviewController.getReview);

    return router;
}
