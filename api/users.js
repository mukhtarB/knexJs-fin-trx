const { Router } = require('express');
const router = Router();

// import utilities
const { hashPassword, comparePassword } = require('../utilities/hash');
const { generateToken } = require('../utilities/generateToken');
const { errFn } = require('../utilities/errHandler');

// import middleware
const { validateRegisteration, validateLogin } = require('../middleware/validate');
const { isLoggedIn } = require('../middleware/auth');

// use middleware
router.use('/register', validateRegisteration);
router.use('/login', validateLogin);
router.use('/logout', isLoggedIn);

// queries
const { insert, selectOne, del } = require('../db/queries');


// endpoints
router.get('/', (req, res) => {
    res.status(200).send('users api route: Authentication Logic');
});


// user registeration endpoint
router.post('/register', validateRegisteration, async (req, res) => {

    try {
        const user = await insert('users', {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordhash: await hashPassword(req.body.password),
        });

        const wallet = await insert('wallets', {
            walletId: Math.floor(Math.random() * 100000000),
            user_id: user.id,
        });

        if (user?.errno) throw errFn(400, user);
        if (wallet?.errno) throw errFn(400, wallet);

        res.status(201).json({
            user,
            wallet
        });

    } catch (error) {
        res.status(error.statusCode || 500).json(['Internal ServerError', error]);
    };

});


// user login endpoint
router.post('/login', validateLogin, async (req, res) => {

    try {
        const user = await selectOne('users', 'email', req.body.email);

        if (!user) return res.status(404).send(errFn(404, 'Incorrect Email or Password'));
        if (user?.errno) throw errFn(400, user);

        const isAuth = await comparePassword(req.body.password, user.passwordhash);

        if (isAuth && user) {
            
            const userAuth = await insert('auth', {
                user_id: user.id,
                token: generateToken(user.passwordhash)
            });

            if (userAuth.errno) throw errFn(400, userAuth);

            // req.headers.authorization = userAuth.token;

            res.status(200).json({
                message: "User Authenticated Successfully",
                uid: user.id,
                token: userAuth.token
            });
        } else {
            res.status(401).json(errFn(401, 'Unauthorized access: Incorrect Email or Password'));
        };

    } catch (error) {
        res.status(error.statusCode || 500).json(['Internal ServerError', error]);
    };
});


// user log out function
router.get('/logout', isLoggedIn, async (req, res) => {

    try {
        const token = req.header('Authorization').slice(7);
        await del('auth', 'token', token);

        res.status(200).json({
            successful: true,
            msg: 'User Token successfully deleted'
        });
    } catch (error) {
        res.status(error.statusCode || 500).json(['Internal ServerError', error]);
    };
});

module.exports = router;