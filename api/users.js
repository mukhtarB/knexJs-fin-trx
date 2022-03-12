const express = require('express');
const {encode} = require('../middleware/hash');
const {insert} = require('../db/queries');

const router = express.Router();

router.use('/register', encode);

router.get('/', (req, res) => {
    res.send('crud users api');
});

// user registeration endpoint
router.post('/register', encode, async (req, res) => {

    // TO DO:
    // [x] - hash password
    // [x] - save user to db via knex queries
    // [x] - generate walletID for user

    const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordhash: req.body.password
    };

    try {
        const user = await insert('users', userDetails);

        const walletDetails = {
            walletId: Math.floor(Math.random() * 90000000),
            user_id: user.id,
        };
        const wallet = await insert('wallets', walletDetails);

        res.status(200).json({
            user,
            wallet
        });

    } catch (error) {
        res.status(500).send(error);
    };

});

module.exports = router;