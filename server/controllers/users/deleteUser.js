const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const signToken = require('./signToken');

module.exports = async (req, res) => {
  const { _id, userName } = req.user;

  try {
    const user = await Users.findByIdAndRemove({ _id });
    return res.status(201).json({ success: true, message: MESSAGES.USER_REMOVED });
  } catch(error) {
    console.log(error);
  }
};


