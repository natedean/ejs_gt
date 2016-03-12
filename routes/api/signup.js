const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    username: String,
    password: String,
    admin: Boolean
}));

const verifyUsernamePassword = (username, password) => {
    if((typeof username !== 'string') || (username.length <= 0) && (username.length > 25)){
        return false;
    }
    if((typeof password !== 'string') || (password.length <= 0) && (password.length > 25)){
        return false;
    }
    // validation passed
    return true;
};

module.exports = (req, res, next) => {

    const isValid = verifyUsernamePassword(req.body.username, req.body.password);

    if(isValid === false){ return res.status(401).end('Username or Password did not meet requirements'); }

    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        admin: true
    });

    newUser.save(function(err) {
        if (err) throw err;

        req.user = newUser;
        next();
    });
};

