var express = require('express');
var router = express.Router();

router.get('/top', require('./top'));
router.post('/update', require('./update'));

module.exports = router;