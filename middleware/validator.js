const Joi = require('joi');

const errorResponse = require('../helpers/errorResponse');

const createError = (errorCode, errorMessage) => ({errorCode, errorMessage});

const returnError = (res, errors) => {
    const errs = [];
    errors.forEach((err) => {
        const {details} = err;
        details2 = Object.values(details);
        console.log(details2);
        console.log(details);


        const message = details.map(i => i.message).join(',');
        errs.push(createError('VALIDATION_ERROR', message));
    });

    return res.json(errorResponse.customResponse('422', 'Validation error', errs))
};

//This middleware is separated into a new function
const validator = (schema) => (req, res, next) => {
    let errors = [];

    Object.keys(schema).forEach((key) => {
        if (key === 'query') {
            //Do something for queries
        }

        if (key === 'params') {
            const {error} = Joi.validate(req.params, schema[key], {abortEarly: false});

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