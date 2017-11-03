const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const signToken = require('./signToken');

// return fields after update
const fields = { local: 0, __v: 0, _id: 0, method: 0 }

module.exports = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await Users.findByIdAndUpdate({ _id }, { $set: { ...req.value.body } }, { new: true, fields });
    const token = await signToken(user);
    return res.status(201).json({ success: true, token, updated: { ...req.value.body } });
  } catch(error) {
    console.log(error);
  }
};


