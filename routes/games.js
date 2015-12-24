var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('games', { title: 'Games' });
});

router.get('/music-theory', function(req, res, next) {
    res.render('music-theory', { title: 'Music Theory Game' });
});

module.exports = router;