const Joi = require('joi');
const MESSAGE = require('./messages');

exports.validateBody = (schema, options) => (req, res, next) => {
  const result = Joi.validate(req.body, schema, options);
  if(result.error) {
    return res.status(400).json(result.error);
  }
  if(!req.value) {
    req.value = {};
  }
  req.value.body = result.value;
  return next();
};
