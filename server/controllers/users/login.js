const Users = require('../../models/users');
const signToken = require('./signToken');
const MESSAGES = require('../../helpers/messages');

module.exports = async (req, res) => {
  console.log(req.body)
  if(req.body.no) {
    return res.status(200).json({ message: MESSAGES.USER_NOT_FOUND });
  }
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Users.findOne({ email });
    const token = await signToken(user);
    return res.status(200).json({ token, message: 'ok' });
  } catch(error) {
    console.log(error)
  }
}