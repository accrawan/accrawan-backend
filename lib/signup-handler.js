let User = require('../models/user'),
  env = require('../config/env'),
  jwt = require('jsonwebtoken');

async function handler(req, res) {
  let userEmail, userUsname;
  try {
    userEmail = await User.findOne({ email: req.body.email });
    userUsname = await User.findOne({ username: req.body.username });
    if (userEmail)
      return res.status(422).json({
        message: 'Sorry, that email has already been used with an account.'
      });
    else if (userUsname)
      return res.status(422).json({
        message: 'Sorry, that username has already been used with an account.'
      });
    else {
      let newUser = new User({
        username: req.body.username,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        email: req.body.email,
        password: req.body.password
      });
      let user;
      try {
        user = await newUser.save();
        let token;
        try {
          token = await jwt.sign(
            {
              user: user
            },
            env.jwt.key,
            {
              audience: env.jwt.audience,
              issuer: env.jwt.issuer,
              expiresIn: req.body.remember == true ? '30d' : '6h'
            }
          );
          res.json({ token });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message:
              'Sorry, couldn\'t create your account at this time, please contact support.'
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Could not create your account'
    });
  }
}

module.exports = handler;
