// imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// route imports
const users = require('./api/users');
const trx = require('./api/transactions');

// app init
const app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// api routing
app.use('/api/v1/users', users);
app.use('/api/v1/transactions', trx);

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