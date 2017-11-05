const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const Users = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  imageUrl: String,
  name: {
    first: String,
    last: String
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review'
    }
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'locations'
    }
  ],
  role: String,
  userName: String
});

Users.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.local.password = await bcrypt.hash(this.local.password, salt);
    next();
  } catch(error) {
    next(error);
  }
});

Users.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
};

const User = mongoose.model('user', Users);

module.exports = User;
