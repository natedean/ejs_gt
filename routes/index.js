var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/nns', function(req, res, next) {
  res.render('nns', { title: 'Nashville Number System' });
});

router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Blog' });
});

module.exports = router;
