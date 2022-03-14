let validateRegisteration = (req, res, next) => {
    if (
        !req.body?.firstName ||
        !req.body?.lastName ||
        !req.body?.email ||
        !req.body?.password
    ) return res.status(400).json({
        message: 'All Fields are required'
    });
    next();
};

let validateLogin = (req, res, next) => {
    if (!req.body?.email || !req.body?.password)
    return res.status(400).json({
        message: 'Email and Password Fields required'
    });
    next();
};

module.exports = {
    validateRegisteration,
    validateLogin
};