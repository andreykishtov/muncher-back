const passport = require('passport');
const passportConf = require('../../../passport')
const { validateBody, schemas, isAuthorized } = require('../../../helpers/routeHelpers');
const usersController = require('../../../controllers/users/index');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

module.exports = (router) => {
    router.
        route('/register')
        .post(usersController.register);
    router.
        route('/login')
        .post(passportSignIn, usersController.login);

    router.
        route('test').get(usersController.test)
    router
        .route('/:userId')
        .get(usersController.getUser)
        .post(passportJwt, isAuthorized, () => { })
        .put(() => { })
        .delete(() => { });


    return router;
};
