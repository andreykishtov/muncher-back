const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const signToken = require('./signToken');

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await Users.findByIdAndRemove({ _id });
    return res.status(201).json({ message: MESSAGES.USER_REMOVED });
  } catch(error) {
    console.log(error);
  }
};

