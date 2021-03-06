const Joi = require('joi');

platforms = ['pc', 'playstation4', 'xbox-one', 'macos', 'nintendo-switch', 'ios', 'android', 'linux', 'all'];

const gameSchema = {
    params: Joi.object({
        id: Joi.string().alphanum().required()
    })
};

const releasesSchema = {
    query: Joi.object({
        min_rating: Joi.number().integer().min(0).max(5),
        platform: Joi.array().single().items(Joi.string().alphanum().valid(platforms))
    })
};

const wishListSchema = {
    body: Joi.object({
        wishName: Joi.string().required()
    })
};

const indexSchema = {
    params: Joi.object({
        index: Joi.number().integer().min(0).required()
    })
};

module.exports = {
    gameSchema,
    releasesSchema,
    wishListSchema,
    indexSchema
};