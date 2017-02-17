var db = require('../../../db');

module.exports = function(req, res, next){
    const username = req.body.username;

    if (!username) { return res.send('No username found, you must include a username in post body.') }

    db.updateUser(username).then(user => {
        res.send(user);
    });
};