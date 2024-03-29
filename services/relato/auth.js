var jwt = require('jsonwebtoken');

var auth = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'superpasstokenuser', function(err, decoded) {
            if (err)
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}

module.exports = auth;