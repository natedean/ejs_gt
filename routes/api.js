var express = require('express');
var router = express.Router();

var signup = require('./api/signup');
var login = require('./api/login');

router.post('/signup', signup, login.successCallback);
router.post('/login', login.authenticateCredentials, login.successCallback);

router.use('/users', require('./api/users'));
router.use('/music-theory/question', require('./api/music-theory/question'));

module.exports = router;
