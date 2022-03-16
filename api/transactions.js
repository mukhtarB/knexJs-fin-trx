const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../middleware/auth');

router.use('/', isLoggedIn);

const { update, selectOne } = require('../db/queries');
const { valDepositWithdrawalReqBody, valTransferReqBody } = require('../middleware/validate');
const { errFn } = require('../utilities/errHandler');


// endpoints
router.get('/', (req, res) => {
    res.status(200).send('transaction api route: Buisness Logic');
});


// user can fund account
router.post('/deposit', valDepositWithdrawalReqBody, async (req, res) => {

    try {
        const wallet = await selectOne('wallets', 'user_id', res.locals.app_user_id);
        if (!wallet) throw errFn(404, "Resource: wallet, not Found. Check params & retry");

        const updated = await update('wallets', 'walletId', wallet.walletId, {amount: wallet.amount + req.body.amount});
        if (!updated) throw errFn(404, "Server update request failed Check params and try again");

        const updatedWallet = await selectOne('wallets', 'walletId', wallet.walletId);

        res.status(200).json({
            msg: 'Wallet funded successfully',
            currentBalance: updatedWallet.amount
        });
    } catch (error) {
        res.status(error.status || 500).json(['Internal ServerError', error]);
    };
    
});


// user can transfer funds to diff account
router.post('/transfer', valTransferReqBody, async (req, res) => {

    try {
        const userWallet = await selectOne('wallets', 'user_id', res.locals.app_user_id);
        if (!userWallet) throw errFn(404, "cannot retreive Resource: userWallet; not found");
        
        const receipientWallet = await selectOne('wallets', 'walletId', req.body.receipientWalletId);
        if (!receipientWallet) errFn(404, "cannot retreive Resource: receipientWalletId; not found");

        if (userWallet.amount < req.body.amount) return res.status(200).json({
            msg: 'Insufficient Balance, Transfer failed',
            currentBalance: userWallet.amount
        });

        const updateWallet = await update('wallets', 'walletId', userWallet.walletId, {amount: userWallet.amount - req.body.amount});
        if (!updateWallet) throw errFn(404, "Transfer not initiated, can't access db");

        const updateWallet_ = await update('wallets', 'walletId', receipientWallet.walletId, {amount: receipientWallet.amount + req.body.amount});
        if (!updateWallet_) {
            // on failed: refund any deductions
            await update('wallets', 'walletId', userWallet.walletId, {amount: userWallet.amount});
            throw errFn(404, "Server Error: Transfer failed, balance refunded");
        };

        const updatedWallet = await selectOne('wallets', 'walletId', userWallet.walletId);

        res.status(200).json({
            msg: `$${req.body.amount} transferred successfully`,
            currentBalance: updatedWallet.amount
        });
    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
});


// user can withdraw from account
router.post('/withdrawals', valDepositWithdrawalReqBody, async (req, res) => {

    try {
        // query wallet based on user and not walletID
        const wallet = await selectOne('wallets', 'walletId', res.locals.app_user_id);
        if (!wallet) throw errFn(404, "Resource: wallet, not Found. Check params & retry");

        if (wallet.amount < req.body.amount) return res.status(200).json({
            msg: 'Insufficient Balance, Transfer failed',
            currentBalance: wallet.amount
        });

        const updated = await update('wallets', 'walletId', wallet.walletId, {amount: wallet.amount - req.body.amount});
        if (!updated) throw errFn(404, "Server update request failed. Check params and try again");

        const updatedWallet = await selectOne('wallets', 'walletId', wallet.walletId);

        res.status(200).json({
            msg: 'Withdrawals were successfully',
            currentBalance: updatedWallet.amount
        });
    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
    
});


module.exports = router;