const express = require('express');

/**
 * @param {string} field Field containing error
 * @returns {object} The Error object
 */

let isRequired = (field) => {return {requiredError: `${field} Field is required`}};

/**
 * @param {string} field Field containing error
 * @param {integer} length expected length of field
 * @returns {object} The Error object
 */

let hasLength = (field, length) => {return {lenError: `${field} must be an ${length} digits`}};

/**
 * @param {string} field Field containing error
 * @param {string} type expected type of field
 * @returns {object} The Error object
 */

let isType = (field, type) => {return {typeError: `${field} field must be an ${type}`}};



/**
 * Validates the req.body on '/registeration'
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const validateRegisteration = (req, res, next) => {
    if (
        !req.body?.firstName ||
        !req.body?.lastName ||
        !req.body?.email ||
        !req.body?.password
    ) return res.status(400).json(isRequired('All'));

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!re.test(req.body.email)) return res.status(400).json({
        validationError: 'Email must be in email format; xxx@yy.zz'
    });

    next();
};


/**
 * Validates the req.body on "/login" route
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const validateLogin = (req, res, next) => {

    if (!req.body?.email || !req.body?.password)
    return res.status(400).json(isRequired('Email and Password'));

    next();
};


/**
 * Validates the req.body on '/deposit' and '/withdrawals' routes
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const valDepositWithdrawalReqBody = (req, res, next) => {

    if (!req.body?.amount)
    return res.status(400).json(isRequired('Amount'));

    if (typeof req.body?.amount !== 'number')
    return res.status(400).json(isType('amount', 'number'));

    next();
};


/**
 * Validates the req.body on '/transfer'
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const valTransferReqBody = (req, res, next) => {

    if (!req.body?.receipientWalletId)
    return res.status(400).json(isRequired('receipientWalletId'));

    if (typeof req.body?.receipientWalletId !== 'number')
    return res.status(400).json(isType('receipientWalletId', 'integer number'));

    if (req.body?.receipientWalletId.toString().length !== 8)
    return res.status(400).json(hasLength('receipientWalletId', 8));

    if (!req.body?.amount) return res.status(400).json(isRequired('Amount'));
    if (typeof req.body?.amount !== 'number') return res.status(400).json(isType('amount', 'number'));

    next();
};


module.exports = {
    validateRegisteration,
    validateLogin,
    valDepositWithdrawalReqBody,
    valTransferReqBody
};