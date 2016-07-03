const verifyUsernamePassword = (username, password) => {
    if((typeof username !== 'string') || (username.length <= 0) && (username.length > 25)){
        return false;
    }

    // validation passed
    return true;
};

module.exports = (req, res, next) => {

    const isValid = verifyUsernamePassword(req.body.username, req.body.password);

    if(isValid === false){ return res.status(401).end('Username or Password did not meet requirements'); }

    // save something???
};

