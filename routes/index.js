var express = require('express');
var router = express.Router();
var { loginHandler, signupHandler } = require('../lib');

router.post('/login', loginHandler);
router.post('/signup', signupHandler);

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.send('respond with a resource');
});

router.use('/gateway', require('./gateway'));
module.exports = router;
