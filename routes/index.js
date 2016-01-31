var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var token = req.query.token;

  res.render('index', { title: 'Express', token: token });
});

router.get('/nns', function(req, res, next) {
  res.render('nns', { title: 'Nashville Number System' });
});

router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Blog' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
