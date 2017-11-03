const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const signToken = require('./signToken');

module.exports = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if(!email) {
      return res.status(200).json({ message: MESSAGES.EMAIL_REQUIRED });
    }
    if(!password) {
      return res.status(200).json({ message: MESSAGES.PASSWORD_REQUIRED });
    }

    const isExisting = await Users.findOne({ email });
    if(isExisting) {
      return res.status(200).json({ error: MESSAGES.EMAIL_TAKEN });
    }

    const newUser = new Users(req.body);
    const user = await newUser.save();
    const token = await signToken(user);
    return res.status(201).json({ token, user: { id: user._id, email: user.email }, message: MESSAGES.CREATED_SUCCESS });

  } catch(error) {
    console.log(error)
  }
};
