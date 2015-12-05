var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('umm... this is the api base route');
});

router.get('/:apiRoute', function(req, res, next) {
  res.send(`You are trying to reach ${req.params.apiRoute}`);
});

module.exports = router;
