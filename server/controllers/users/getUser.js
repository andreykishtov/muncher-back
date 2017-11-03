const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');

module.exports = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById({ _id: userId }, { __v: 0, password: 0, _id: 0 });
    res.status(200).json(user);
  } catch(error) {
    res.status(400).json({ message: MESSAGES.USER_NOT_FOUND });
  }
};
