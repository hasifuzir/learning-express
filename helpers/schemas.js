const Joi = require('joi');

platforms = ['pc', 'playstation4'];

const gameSchema = {
    params: Joi.object({
        id: Joi.string().alphanum().required()
    })
};

const releasesSchema = {
    query: Joi.object({
        rating: Joi.number().integer().min(0).max(5),
        platform: Joi.string().alphanum().valid(platforms)
    })
};

module.exports = {
    gameSchema,
    releasesSchema
};