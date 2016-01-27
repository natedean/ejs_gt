var express = require('express');
var router = express.Router();

router.get('/music-theory/question', require('./api/music-theory/question'));

router.post('/login', require('./api/login'));

module.exports = router;
