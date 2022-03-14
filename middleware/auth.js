const {selectOne} = require('../db/queries');

let isLoggedIn = async (req, res, next) => {
    try {
        let message = {
            isLoggedIn: false,
            errMsg: 'Unauthorized access: Logging and retry'
        };

        let token = req.headers['token'];
        if (!token) return res.status(401).json(message);

        const tokenRes = await selectOne('auth', 'token', token);

        if (tokenRes?.code) throw tokenRes;
        if (!tokenRes) return res.status(401).json(message);
        
        next();

    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };    
};

module.exports = {isLoggedIn};