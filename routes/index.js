var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.send('respond with a resource');
});

router.use('/gateway', require('./gateway'));
module.exports = router;
