const Joi = require('joi');

exports.schemas = {
  registerUserValidation: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    imageUrl: Joi.string(),
    name: Joi.object({
      first: Joi.string(),
      last: Joi.string()
    }),
    userName: Joi.string(),
    reviews: Joi.array(),
    locations: Joi.array()
  }),
  loginUserValidation: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}
