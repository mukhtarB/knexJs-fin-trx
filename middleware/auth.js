const bcrypt = require('bcrypt');

// using bcrypt to hash a str
const encode = (req, res, next) => {

    // require password
    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
    
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return next(err);
                
                req.body.password = hash;
                next();
            })
        });
    } else {
        // return unauthorized
        res.status(401).json({
            err:"Unauthorized",
            msg: "password is required"
        });
    };

    
};

module.exports = {encode};