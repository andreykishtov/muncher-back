const Joi = require('joi');
const JWT = require('jsonwebtoken');
const MESSAGE = require('./messages');

module.exports = {
    validateBody: schema => (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        if(result.error) {
            return res.status(400).json(result.error);
        }
        if(!req.value) {
            req.value = {};
        }
        req.value.body = result.value;
        return next();
    },
    isAuthorized: (req, res, next) => {
        const userIdFromParams = req.params.userId;
        const userIdFromBody = req.body.id;
        const userIdFromParam = req.query.id;
        const { authorization } = req.headers;

        const decodedToken = JWT.decode(authorization, { complete: true });
        const userIdFromToken = decodedToken.payload.id;
        const isTheUser = (
            (userIdFromParams === userIdFromToken)  
            || (userIdFromBody === userIdFromToken)
            || (userIdFromParam === userIdFromToken)
        );

        if(!isTheUser) {
            return res.status(401).json({ message: MESSAGE.NOT_AUTHORIZED });
        }

        return next();
    },
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string()
                .email().min(10).max(30)
                .required(),
            password: Joi.string().min(8).max(20).required(),
            imageUrl: Joi.string(),
            name: Joi.object({
                first: Joi.string(),
                last: Joi.string()
            }),
            reviews: Joi.array(),
            locations: Joi.array()
        })
    }
};
