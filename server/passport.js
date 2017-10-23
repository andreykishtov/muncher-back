const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
const { JWT_SECRET } = require('./configuration');

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: JWT_SECRET
        },
        async (payLoad, next) => {
            try {
                const user = await User.findById(payLoad.sub);
                if (!user) {
                    return next(null, false);
                }
                next(null, user);
            } catch (error) {
                next(error, false);
            }
        }
    )
);

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, next) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return next(null, false);
                }
                const isMatch = await user.isValidPassword(password);
                if (!isMatch) {
                    return next(null, false);
                }
                next(null, user);
            } catch (error) {
                next(error, false);
            }
        }
    )
);
