const Joi = require('joi');
const JWT = require('jsonwebtoken');

module.exports = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }
    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    return next();
  },
  isAuthorized: (req, res, next) => {
    const { userId } = req.params;
    const { authorization } = req.headers;

    const decodedToken = JWT.decode(authorization, { complete: true });
    const userSub = decodedToken.payload.sub;

    if (userId !== userSub) {
      return res.status(401).json({ message: 'Nope, you can\'t go there', route: '/' });
    }

    return next();
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      imageUrl: Joi.string(),
      name: Joi.object({
        first: Joi.string(),
        last: Joi.string(),
      }),
      reviews: Joi.array(),
      locations: Joi.array(),
    }),
  },
};
