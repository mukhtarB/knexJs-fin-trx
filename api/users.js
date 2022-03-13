const {Router} = require('express');
const router = Router();

// import utilities
const {hashPassword, comparePassword} = require('../utilities/hash');
const {generateToken} = require('../utilities/generateToken');

// middleware
// router.use('/register', encode);

// queries
const {insert, selectOne} = require('../db/queries');
const { cookie } = require('express/lib/response');


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

        if (user.code) throw user;
        if (wallet.code) throw wallet;

        res.status(200).json({
            user,
            wallet
        });

    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };

});

// user login endpoint
router.post('/login', async (req, res) => {

    // TO DO:
    // [x] - retreive & verify login details
    // [x] - utility: compare passwords
    // [x] - utility: onSuccess generate token, else unauthorized
    // [x] - query: save token
    // [x] - set headers/cookies for token

    try {
        const user = await selectOne('users', 'email', req.body.email);
        const isAuth = await comparePassword(req.body.password, user.passwordhash);

        if (isAuth) {
            
            const userAuth = await insert('auth', {
                user_id: user.id,
                token: generateToken(user.passwordhash)
            });

            if (userAuth.code) throw {msg: 'Client already logged In', ...userAuth};

            // set cookie or set headers
            res.header("token", userAuth.token);

            res.status(200).json({
                message: "User Authenticated Successfully",
                uid: user.id,
                token: userAuth.token
            });
        } else {
            res.status(401).json({
                err: 'Unauthorized access',
                msg: 'Incorrect Username or Password'
            });
        };

    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
});

module.exports = router;