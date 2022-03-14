const {Router} = require('express');
const router = Router();

const {isLoggedIn} = require('../middleware/auth');

// require logging on all /transactions/ route
// router.use('/', isLoggedIn);

const {update, selectOne} = require('../db/queries');


// endpoints
router.get('/', (req, res) => {
    res.status(200).send('transaction api: Buisness Logic');
});


// user can fund account
router.post('/deposit', async (req, res) => {

    // TO DO:
    // [x] - retrieve wallet
    // [x] - update wallet.amount (credit)

    try {
        const wallet = await selectOne('wallets', 'walletId', req.body.walletId);
        if (!wallet) throw "Can't retrieve wallet details. Check params & retry";

        const updated = await update('wallets', 'walletId', req.body.walletId, {amount: wallet.amount + req.body.amount});
        if (!updated || updated == 0) throw "Can't find entry in db. Check params and try again";

        const updatedWallet = await selectOne('wallets', 'walletId', req.body.walletId);

        res.status(200).json({
            msg: 'Wallet funded successfully',
            currentBalance: updatedWallet.amount
        });
    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
    
});


// user can transfer funds to diff account
router.post('/transfer', async (req, res) => {

    // TO DO:
    // [x] - retrieve userWallet && receipientWallet
    // [x] - update userWallet (debit)
    // [x] - update mreceipentallet (credit)

    try {
        const userWallet = await selectOne('wallets', 'walletId', req.body.userWalletId);
        if (!userWallet) throw "Can't retrieve wallets details. Check params & retry";
        
        const receipientWallet = await selectOne('wallets', 'walletId', req.body.receipientWalletId);
        if (!receipientWallet) throw "Can't retrieve wallets details. Check params & retry";

        if (userWallet.amount < req.body.amount) return res.status(200).json({
            msg: 'Insufficient Balance, Transfer failed',
            currentBalance: userWallet.amount
        });

        const updatedWallet = await update('wallets', 'walletId', userWallet.walletId, {amount: userWallet.amount - req.body.amount});
        if (!updatedWallet) throw "Can't --find entry in db. Check params and try again";

        const updatedWallet_ = await update('wallets', 'walletId', receipientWallet.walletId, {amount: receipientWallet.amount + req.body.amount});
        if (!updatedWallet_) {
            // refund any deductions
            await update('wallets', 'walletId', userWallet.walletId, {amount: userWallet.amount});
            throw "Server Error: Transfer failed, balance refunded";
        };

        res.status(200).json({
            msg: `$${req.body.amount} transferred successfully`,
            currentBalance: updatedWallet.amount
        });
    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
});


module.exports = router;