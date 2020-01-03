const Joi = require('joi');

const gameSchema = {
    params: Joi.object({
        id: Joi.string().alphanum().required()
    })
};

module.exports = {gameSchema};