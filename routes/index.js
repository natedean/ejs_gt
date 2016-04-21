var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Guitar Thinker' });
});

router.get('/nns', function(req, res, next) {
  res.render('nns', { title: 'Nashville Number System' });
});

router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Blog' });
});

router.get('/music-theory-game', function(req, res, next) {
  res.render('music-theory-game', { title: 'Music Theory Game' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('sign-up', { title: 'Sign Up' });
});

module.exports = router;
