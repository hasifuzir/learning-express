const Joi = require('joi');
//const _ = require('lodash');
//const Schemas = require('../helpers/schemas.js');

const apiResponse = require('../helpers/apiResponse');

//This middleware is separated into a new function
const paramsId = (schema) => {

    return (req, res, next) => {
        const {error} = Joi.validate(req.params.id, schema);

        const valid = error == null;

        if (valid) {
            console.log('Validated!');
            next();
        }
        else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
            res.json(apiResponse.fail('422', 'Validation error', 'VALIDATION_ERROR', message));

        }
    }
};

module.exports = {paramsId};