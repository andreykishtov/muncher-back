const Users = require('../../models/users');
const signToken = require('./signToken');
const MESSAGES = require('../../helpers/messages');

module.exports = async (req, res) => {
  try {
    const { userName,  role, _id } = req.user;
    const {email} = req.user.local

    const token = await signToken(req.user);
    return res.status(200).json({ success: true, token, user: { userName, email, role, id:_id }, message: 'ok' });
  } catch(error) {
    console.log(error)
  }
}
