const reviewController = require('../../../controllers/reviews');
const router = require('express').Router();


  router
    .route('/')
    .get(reviewController.getReviews)
    .post(reviewController.addReview);

  router
    .route('/:reviewId')
    .get(reviewController.getReview)
    .put(() => { })
    .delete(() => { });


    module.exports = router;

