const JWT = require('jsonwebtoken');
const { JWT_SECRET, JWT_ISS } = require('../../configuration');
const moment = require('moment');
const now = moment();
const exp = moment().add(1, 'day');

module.exports = async user => {
  return new Promise((resolve, reject) => {
    resolve(JWT.sign(
      {
        iss: JWT_ISS,
        id: user._id,
        role: user.role,
        userName: user.userName,
        iat: parseInt(now.format('x')),
        exp: parseInt(now.format('x'))
      },
      JWT_SECRET
    ))
  })
}
