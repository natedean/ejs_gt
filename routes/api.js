var express = require('express');
var router = express.Router();

const fakeQuestion = {
  answers:
    [ {answer: "F#min", correct: true},
      {answer: "Amin", correct: false},
      {answer: "Bmin", correct: false},
      {answer: "Gmin", correct: false}
    ],
  question: "What is the second chord in the key of E Major?"
};

router.get('/', function(req, res, next) {
  res.send('umm... this is the api base route');
});

router.get('/:apiRoute', function(req, res, next) {
  res.send(`You are trying to reach ${req.params.apiRoute}`);
});

router.get('/music-theory/question', require('./api/music-theory/question'));

module.exports = router;
