const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const register = require('../users/register');
const Location = require('../../models/locations');
const Review = require('../../models/reviews');

module.exports = async (req, res) => {
  // after we got to this route and our user can create customers
  // we should start with the creation of the user

  // 1. req.body should first have user
  if (!req.body.customer) {
    return;
  }

  if (!req.body.customer.info) {
    return;
  }

  // 2. req.body should have location
  if (!req.body.customer.location) {
    return;
  }

  // flow of creation
  const { email } = req.body.customer.info;
  const { location } = req.body.customer;

  // a. find user in our data base
  try {
    let owner = await Users.findOne({ 'local.email': email });

    if (!owner) {
      req.value = {};
      req.value.body = { ...req.body.customer.info };
      await register(req, res);
      owner = await Users.findOne({ 'local.email': email });
    }

    location.owner = owner._id;
    const newLocation = new Location(location);
    const savedLocation = await newLocation.save();
    await Users.findByIdAndUpdate(
      { _id: owner._id },
      { $push: { locations: savedLocation._id } },
      { new: true }
    );
    return res.status(200).json({ success: true, message: 'Location added to user' });

    res.status(200).json({ success: true, message: 'Some magic will happen here' });
  } catch (error) {
    console.log(error);
  }
};
