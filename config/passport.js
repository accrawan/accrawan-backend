const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const {jwt} = require('./env');
const debug = require('debug')('accrawan-backend:server');

module.exports = passport => {
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt.key,
        issuer: jwt.issuer,
        audience: jwt.audience
      },
      async (jwt_payload, done) => {
        let user;
        try {
          user = await User.findOne(
            {
              email: jwt_payload.user.email,
              _id: jwt_payload.user._id,
              username: jwt_payload.user.username
            },
            { password: 0 }
          );
          if (user) return done(null, user);
          return done(new Error('No user found'));
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
