const Joi = require('joi');
//const _ = require('lodash');
//const Schemas = require('../helpers/schemas.js');

const apiResponse = require('../helpers/apiResponse');

const createError = (errorCode, errorMessage) => ({errorCode, errorMessage});

const returnError = (res, errors) => {
    const errs = [];
    errors.forEach((err) => {
        const { details } = err;
        const message = details.map(i => i.message).join(',');
        errs.push(createError('VALIDATION_ERROR', message));
    })
    return res.json(apiResponse.response('422', 'Validation error', {errors: errs}));
}

//This middleware is separated into a new function
const validator = (schema) => (req, res, next) => {
    const errors = [];
    Object.keys(schema).forEach((key) => {
        if (key === 'query') {
            const { error } = Joi.validate(req.query, schema[key]);
            if (error) {
                errors.push(error);
            }
        }
        if (key === 'params') {
            const { error } = Joi.validate(req.params, schema[key]);
            if (error) {
                errors.push(error);
            }
        }
    });
    if (errors.length) {
        return returnError(res, errors);
    }
    return next();
};

module.exports = validator;