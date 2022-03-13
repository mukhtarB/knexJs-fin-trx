const {Router} = require('express');
const router = Router();

// import utilities
const {hashPassword} = require('../utilities/hash');

// middleware
// router.use('/register', encode);

// queries
const {insert} = require('../db/queries');


// endpoints
router.get('/', (req, res) => {
    res.send('crud users api');
});

// user registeration endpoint
router.post('/register', async (req, res) => {

    // TO DO:
    // [x] - verify req.body.params
    // [x] - utility: hash password
    // [x] - queries: save user to db via knex queries
    // [x] - queries: generate walletID for user

    try {
        const user = await insert('users', {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordhash: await hashPassword(req.body.password),
        });

        const wallet = await insert('wallets', {
            walletId: Math.floor(Math.random() * 90000000),
            user_id: user.id,
        });

        res.status(200).json({
            user,
            wallet
        });

    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };

});

module.exports = router;