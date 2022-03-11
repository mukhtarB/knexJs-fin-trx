const express = require('express');
const {encode} = require('../middleware/auth')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('crud users api');
});

// user reg endpoint
router.post('/register', encode, (req, res) => {
    const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    console.table(userDetails);

    // TO DO:
    // hash password
    // save to db via knex queries
    // generate token subsequent for auth
    // save token against user
    res.status(200).json(userDetails);
});

module.exports = router;