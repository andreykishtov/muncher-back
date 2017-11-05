const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');

module.exports = async (req, res) => {
  try {
    const users = await Users.find({}, { __v: 0, local: 0, method: 0, _id: 0 });
    res.status(200).json({ success: true, users });
  } catch(error) {
    res.status(400).json({ success: false, message: MESSAGES.USER_NOT_FOUND });
  }
};
