var express = require('express');
var router = express.Router();

var signup = require('./api/signup');
var login = require('./api/login');

router.get('/music-theory/question', require('./api/music-theory/question'));

router.post('/signup', signup, login.successCallback);
router.post('/login', login.authenticateCredentials, login.successCallback);

module.exports = router;
