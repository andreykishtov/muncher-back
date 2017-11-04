const JWT = require('jsonwebtoken');

exports.isAuthorizedUser = (req, res, next) => {
  const userIdFromParams = req.params.userId;
  const userIdFromBody = req.body.id;
  const userIdFromJoi = (req.value && req.value.body.id);
  const userIdFromParam = req.query.id;
  const { authorization } = req.headers;

  const decodedToken = JWT.decode(authorization, { complete: true });
  const userIdFromToken = decodedToken.payload.id;
  const isTheUser = (
    (userIdFromParams === userIdFromToken)
    || (userIdFromBody === userIdFromToken)
    || (userIdFromParam === userIdFromToken)
    || (userIdFromJoi === userIdFromToken)
  );

  if(!isTheUser) {
    return res.status(401).json({ message: MESSAGE.NOT_AUTHORIZED });
  }

  return next();
};
