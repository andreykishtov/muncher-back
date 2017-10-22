const router = require('express-promise-router')();
const passport = require('passport');
const { validateBody, schemas, isAuthorized } = require('../../helpers/routeHelpers');
const usersController = require('../../controllers/users');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

// router.route('/').post(usersController.addUser);
//     .get(locationController.getLocations)
//     .put(() => false)
//     .delete(() => false);

router.route('/signUp').post(validateBody(schemas.authSchema), usersController.signUp);

router
  .route('/signIn')
  .post(validateBody(schemas.authSchema), passportSignIn, usersController.signIn);

router.route('/secret').get(passportJwt, usersController.secret);

router
  .route('/:userId')
  .get(usersController.getUser)
  .post(passportJwt, isAuthorized, usersController.getUser)
  .put(() => {})
  .delete(() => {});

module.exports = router;
