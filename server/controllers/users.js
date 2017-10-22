const JWT = require('jsonwebtoken');
const Users = require('../models/users');
const { JWT_SECRET } = require('../configuration');

const signToken = user => JWT.sign(
  {
    iss: 'Trippy',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  },
  JWT_SECRET,
);

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.params.userId }, '-__v');
      res.status(200).json(user);
    } catch (error) {
      res.send(error);
    }
  },
  addUser: async (req, res) => {
    if (!req.body.email) {
      return res.status(200).json({ message: 'email id is mandatory' });
    }
    if (!req.body.password) {
      return res.status(200).json({ message: 'password id is mandatory' });
    }
    const newUser = new Users(req.body);
    const user = await newUser.save();
    return res.status(200).json({ user, message: 'Updated Successfully' });
  },
  signUp: async (req, res) => {
    const { email } = req.value.body;

    const foundUser = await Users.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email Allready in use' });
    }

    // create a new user
    const newUser = new Users(req.value.body);
    await newUser.save();

    const token = signToken(newUser);

    // Respond with a token
    return res.status(200).json({ token });
  },
  signIn: async (req, res) => {
    if (!req.body.email) {
      return res.status(200).json({ message: 'email id is mandatory' });
    }
    if (!req.body.password) {
      return res.status(200).json({ message: 'password id is mandatory' });
    }
    // generate token
    const token = signToken(req.user);
    return res.status(200).json({ token });
  },
  secret: async (req, res) => {
    res.json({ secret: 'resource' });
  },
};
