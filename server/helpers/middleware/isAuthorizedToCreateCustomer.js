const JWT = require('jsonwebtoken');
const MESSAGE = require('../messages');
const ROLES = require('../roles');

exports.canCreateUser = (req, res, next) => {
  const { authorization } = req.headers;
  const { token } = req.body;

  const userRole = authorization || token;

  if (!userRole) {
    return res.status(401).json({ message: MESSAGE.NOT_AUTHORIZED });
  }

  const decodedToken = JWT.decode(userRole, { complete: true });

  const { role } = decodedToken.payload;

  if (role !== ROLES.admin || role !== ROLES.developer || role !== ROLES.moderator) {
    return res.status(401).json({ message: MESSAGE.NOT_AUTHORIZED });
  }

  return next();
};
