var db = require('../../../db');

module.exports = function(req, res, next){
	db.User.find({}, 'username gcgScore').sort({gcgScore: -1}).limit(10).exec((err, users) => {
		if (err) return console.error(err, 'brosef');

		res.send(users);
	});
};