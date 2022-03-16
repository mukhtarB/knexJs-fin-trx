const errFn = (statusCode, errMsg) => {
    return { statusCode, errMsg };
};

module.exports = {errFn};