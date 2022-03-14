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

module.exports = router;