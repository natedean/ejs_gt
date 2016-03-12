var express = require('express');
var router = express.Router();

var signUp = require('./api/signUp');
var login = require('./api/login');

router.get('/music-theory/question', require('./api/music-theory/question'));

router.post('/signUp', signUp, login.successCallback);
router.post('/login', login.authenticateCredentials, login.successCallback);

module.exports = router;
