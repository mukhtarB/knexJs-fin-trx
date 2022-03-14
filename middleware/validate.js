const validateRegisteration = (req, res, next) => {
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


const validateLogin = (req, res, next) => {
    if (!req.body?.email || !req.body?.password)
    return res.status(400).json({
        message: 'Email and Password Fields required'
    });
    next();
};


const valDepositWithdrawalReqBody = (req, res, next) => {

    if (!req.body?.walletId) return res.status(400).json('WalletId Field is required');
    if (!req.body?.amount) return res.status(400).json('Amount Field is required');

    next();
};


const valTransferReqBody = (req, res, next) => {

    if (!req.body?.userWalletId) return res.status(400).json('userWalletId Field is required');
    if (!req.body?.receipientWalletId) return res.status(400).json('receipientWalletId Field is required');
    if (!req.body?.amount) return res.status(400).json('Amount Field is required');

    next();
};


module.exports = {
    validateRegisteration,
    validateLogin,
    valDepositWithdrawalReqBody,
    valTransferReqBody
};