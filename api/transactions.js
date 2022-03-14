const {Router} = require('express');
const router = Router();

const {isLoggedIn} = require('../middleware/auth');

// require logging on all /transactions/ route
router.use('/', isLoggedIn);

// endpoints
router.get('/', (req, res) => {
    res.status(200).send('transaction api: Buisness Logic');
});


// user can fund account
router.post('/deposit', (req, res) => {
    res.status(200).send('deposited')
})

module.exports = router;