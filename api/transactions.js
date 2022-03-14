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
        const updated = await update('wallets', 'walletId', req.body.walletId, {amount: req.body.amount});
        console.log(updated)

        if (!updated || updated == 0) throw "Can't find entry in db. Check params and try again";

        const wallet = await selectOne('wallets', 'walletId', req.body.walletId);
        console.log(wallet)
        res.status(200).json({
            msg: 'Wallet funded successfully',
            currentBalance: wallet.amount
        });
    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
    
});

module.exports = router;