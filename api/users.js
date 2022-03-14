const {Router} = require('express');
const router = Router();

// import utilities
const {hashPassword, comparePassword} = require('../utilities/hash');
const {generateToken} = require('../utilities/generateToken');

// import middleware
const {validateRegisteration, validateLogin} = require('../middleware/validate');

// middleware
router.use('/register', validateRegisteration);
router.use('/login', validateLogin);

// queries
const {insert, selectOne, del} = require('../db/queries');


// endpoints
router.get('/', (req, res) => {
    res.send('crud users api');
});

// user registeration endpoint
router.post('/register', validateRegisteration, async (req, res) => {

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

        if (user?.code) throw user;
        if (wallet?.code) throw wallet;

        res.status(200).json({
            user,
            wallet
        });

    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };

});


// user login endpoint
router.post('/login', validateLogin, async (req, res) => {

    // TO DO:
    // [x] - retreive & verify login details
    // [x] - utility: compare passwords
    // [x] - utility: onSuccess generate token, else unauthorized
    // [x] - query: save token
    // [x] - set headers/cookies for token

    try {
        const user = await selectOne('users', 'email', req.body.email);
        if (!user) return res.status(404).send('Incorrect Email or Password');

        const isAuth = await comparePassword(req.body.password, user.passwordhash);

        if (user?.code) throw user;

        if (isAuth && user) {
            
            const userAuth = await insert('auth', {
                user_id: user.id,
                token: generateToken(user.passwordhash)
            });

            if (userAuth.code) throw {msg: 'Client already logged In', ...userAuth};

            res.header("token", userAuth.token);

            res.status(200).json({
                message: "User Authenticated Successfully",
                uid: user.id,
                token: userAuth.token
            });
        } else {
            res.status(401).json({
                err: 'Unauthorized access',
                msg: 'Incorrect Email or Password'
            });
        };

    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
});


// user log out function
router.get('/logout', async (req, res) => {

    // TO DO:
    // [x] - retreive token from headers
    // [x] - query db by token
    // [x] - query del entry

    try {
        token = req.headers['token'];
        const tokenRes = await selectOne('auth', 'token', token);

        if (!tokenRes) return res.status(404).send('token does not exist');
        if (tokenRes.code) throw tokenRes;

        await del('auth', 'token', tokenRes.token);

        res.status(200).json({
            successful: true,
            msg: `Token successfully deleted for user ${tokenRes.user_id}`
        });
    } catch (error) {
        res.status(500).json(['Internal ServerError', error]);
    };
});

module.exports = router;