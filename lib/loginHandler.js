const User = require('../models/user');
const env = require('../config/env');
const jwt = require('jsonwebtoken');
const debug = require('debug')('accrawan-backend:lib.loginHandler');
async function handler(req, res) {
  let user;
  try {
    user = await User.findOne(
      {
        $or: [
          {
            email: req.body.username.toLowerCase()
          },

          {
            username: req.body.username.toLowerCase()
          }
        ]
      },
      {
        username: 1,
        email: 1,
        password: 1,
        _id: 1
      }
    );
    if (!user) {
      res.status(404).json({
        code: 404,
        message: 'Sorry, No User found'
      });
    } else {
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (error) return res.send(error);
        // res.json(user);
        if (!isMatch) {
          return res.status(401).json({
            code: 401,
            message: 'Username or Password incorrect'
          });
        }
        jwt.sign(
          {
            user: {
              _id: user._id,
              username: user.username,
              email: user.email
            }
          },
          env.jwt.key,
          {
            audience: env.jwt.audience,
            issuer: env.jwt.issuer,
            expiresIn: req.body.remember == true ? '30d' : '6h'
          },
          (err, token) => {
            if (err) return res.status(500).send(err);
            res.json({ token });
          }
        );
      });
    }
  } catch (error) {
    debug(error);
    res.json({
      message: 'Sorry, we could not log you in.'
    });
  }
}

module.exports = handler;
