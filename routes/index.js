const express = require('express');
const router = express.Router();
const { loginHandler, signupHandler } = require('../lib');
const passport = require('passport');
router.post('/login', loginHandler);
router.post('/signup', signupHandler);

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.send('respond with a resource');
});

router.use(
  '/gateway',
  passport.authenticate('jwt', { session: false }),
  require('./gateway')
);
module.exports = router;
