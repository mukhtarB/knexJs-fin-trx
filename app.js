// imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const {encode} = require('./middleware/auth');

// route imports
const users = require('./api/users');

// app init
const app = express();

// middlewares
// if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
// }
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(encode);

// api routing
app.use('/api/v1/users', users);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to a Fin Tech rest api using node, express, knexJS and mySQL')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // on error 
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;