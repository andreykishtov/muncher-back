const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const signToken = require('./signToken');

module.exports = async (req, res) => {
  let userRole = null;
  try {
    const { email, password } = req.value.body;
    if(!email) {
      return res.status(200).json({ message: MESSAGES.EMAIL_REQUIRED });
    }
    if(!password) {
      return res.status(200).json({ message: MESSAGES.PASSWORD_REQUIRED });
    }

    if(!req.body.role || !req.value.body.role) {
      userRole = 1
    }
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
      role: userRole
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
