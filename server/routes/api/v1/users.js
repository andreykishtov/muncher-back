const passport = require('passport');
const passportConf = require('../../../passport')
const { validateBody } = require('../../../helpers/routeValidation');
const { schemas } = require('../../../helpers/validationSchemas');
const { isAuthorizedUser } = require('../../../helpers/authorizations')
const usersController = require('../../../controllers/users/index');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

module.exports = (router) => {
  router.
    route('/register')
    .post(validateBody(schemas.registerUserValidation), usersController.register);
  router.
    route('/login')
    .post(validateBody(schemas.loginUserValidation), passportSignIn, usersController.login);

  router.
    route('/test')
    .get(passportJwt, isAuthorizedUser, usersController.test);

  router.
    route('/')
    .get(usersController.getAll);

  router.
    route('/:userId')
    .get(usersController.getUser)
    .put(passportJwt, validateBody(schemas.beforeUpdateUserValidation, { 'allowUnknown': true }), isAuthorizedUser, usersController.updateUser)
    .delete(passportJwt, isAuthorizedUser, usersController.deleteUser);

  return router;
};
