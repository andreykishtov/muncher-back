const JWT = require('jsonwebtoken');
const Users = require('../models/users');
const { JWT_SECRET } = require('../configuration');
const MESSAGES = require('../helpers/messages');

const signToken = user =>
    JWT.sign(
        {
            iss: 'Trippy',
            sub: user._id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        JWT_SECRET
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
        let email = req.body.email;
        let password = req.body.password;
        if (!email) {
            return res.status(200).json({ message: MESSAGES.EMAIL_REQUIRED });
        }
        if (!password) {
            return res.status(200).json({ message: MESSAGES.PASSWORD_REQUIRED });
        }
        const newUser = new Users(req.body);
        const user = await newUser.save();
        return res.status(200).json({ user, message: MESSAGES.CREATED_SUCCESS });
    },
    signUp: async (req, res) => {
        const { email } = req.value.body;

        const foundUser = await Users.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ error: MESSAGES.EMAIL_TAKEN });
        }

        const newUser = new Users(req.value.body);
        await newUser.save();

        const token = signToken(newUser);
        return res.status(200).json({ token });
    },
    signIn: async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        if (!email) {
            return res.status(200).json({ message: MESSAGES.EMAIL_REQUIRED });
        }
        if (!password) {
            return res.status(200).json({ message: MESSAGES.PASSWORD_REQUIRED });
        }
        const token = signToken(req.user);
        return res.status(200).json({ token });
    },
    secret: async (req, res) => {
        res.json({ secret: 'resource' });
    }
};
