const express = require('express');
const { selectOne } = require('../db/queries');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

let isLoggedIn = async (req, res, next) => {
    let errFn = (errMsg) => {
        return { isLoggedIn: false, errMsg };
    };
    
    try {
        const tokenAuthorization = req.header('Authorization');
        if (!tokenAuthorization) return res.status(401).json(errFn('Unauthorized access: No Authorization'));

        const token = tokenAuthorization.slice(7);

        const tokenRes = await selectOne('auth', 'token', token);

        if (tokenRes?.errno) throw tokenRes;
        if (!tokenRes) return res.status(401).json(errFn('Unauthorized access: Authorization failed'));

        res.locals.app_user_id = tokenRes.user_id;

        next();

    } catch (error) {
        res.status(error).json(['Internal ServerError', error]);
    };
};

module.exports = {isLoggedIn};