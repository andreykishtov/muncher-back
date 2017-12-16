const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const signToken = require('./signToken');
const roles = require('../../helpers/roles')
module.exports = async (req, res) => {
  const { email, password, role } = req.value.body;

  if(!email) {
    return res.status(200).json({ message: MESSAGES.EMAIL_REQUIRED });
  }

  if(!password) {
    return res.status(200).json({ message: MESSAGES.PASSWORD_REQUIRED });
  }

  if(!role) {
    role = roles.MEMBER
  }

  try {
    const isExisting = await Users.findOne({ 'local.email': email });

    if(isExisting) {
      return res.status(200).json({ error: MESSAGES.EMAIL_TAKEN });
    }

    const newUser = new Users({
      method: 'local',
      local: {
        email: email,
        password: password
      },
      role: role
    });

    const savedUser = await newUser.save();
    const token = await signToken(savedUser);

    const user = {
      id: savedUser._id,
      email: savedUser.local.email
    }

    return res.status(201).json({ success: true, token, user, message: MESSAGES.CREATED_SUCCESS });

  } catch(error) {
    console.log(error)
  }
};
