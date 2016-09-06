var express = require('express');
var router = express.Router();

router.get('/top', require('./top'));

module.exports = router;