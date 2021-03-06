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
    async (payLoad, done) => {
      try {
        const user = await User.findById(payLoad.id);
        if(!user) {
          return done(null, false);
        }
        done(null, user);
      } catch(error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ 'local.email': email });
        if(!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch = await user.isValidPassword(password);
        if(!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        done(null, user);
      } catch(error) {
        done(error, false);
      }
    }
  )
);
