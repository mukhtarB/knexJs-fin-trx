const {selectOne} = require('../db/queries');

let isLoggedIn = async (req, res, next) => {
    try {
        let token = req.headers['token'];
        const tokenRes = await selectOne('auth', 'token', token);

        if (tokenRes?.code) throw tokenRes;
        if (!tokenRes) return res.status(401).json({
            err: 'Unauthorized access',
            isLoggedIn: false
        });
        next();
    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };    
};

module.exports = {isLoggedIn}