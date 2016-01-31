const jwt = require('jsonwebtoken');
const jwtSecret = 'asdf'; //TODO: Make ENV variable

// fake user from database
const user = {
    username: 'nate',
    password: 'test'
};

const successCallback = (req, res, next) => {
    var token = jwt.sign({ username: 'test' }, jwtSecret);

    res.redirect(`/?token=${token}`);
};

const authenticateCredentials = (req, res, next) => {
    var body = req.body;

    if(!body.username || !body.password){
        res.status(400).end('Must provide username or password');
    }
    // TODO: hook to database
    if(body.username !== user.username || body.password !== user.password){
        res.status(401).end('Username of password incorrect');
    }

    next();
};

module.exports = { authenticateCredentials, successCallback };
