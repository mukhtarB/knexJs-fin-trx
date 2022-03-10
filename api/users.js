const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('crud users api');
});

module.exports = router;