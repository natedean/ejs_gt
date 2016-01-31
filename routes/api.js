var express = require('express');
var router = express.Router();
var login = require('./api/login');

router.get('/music-theory/question', require('./api/music-theory/question'));

router.post('/login', login.authenticateCredentials, login.successCallback);

module.exports = router;
