const JWT = require('jsonwebtoken');
const MESSAGE = require('../messages');
const ROLES = require('../roles');

exports.canCreateUser = (req, res, next) => {
  const { authorization } = req.headers;
  const { token } = req.body;

  const userRole = authorization || token;

  if(!userRole) {
    return res.status(401).json({ message: MESSAGE.NOT_AUTHORIZED });
  }

  const decodedToken = JWT.decode(userRole, { complete: true });

  const { role } = decodedToken.payload;

  const isAdmin = role === ROLES.ADMIN;
  const isDev = role === ROLES.DEVELOPER;
  const isMod = role === ROLES.MODERATOR;

  if(!isAdmin && !isDev && !isMod) {
    return res.status(401).json({ message: MESSAGE.NOT_AUTHORIZED });
  }
  return next();
};
