const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const Location = require('../../models/locations');
const Review = require('../../models/reviews');

module.exports = async (req, res) => {
  if (!req.body.customer) {
    return;
  }

  if (!req.body.customer.info) {
    return;
  }

  if (!req.body.customer.location) {
    return;
  }

  const { email } = req.body.customer.info;
  const { location } = req.body.customer;

  try {
    let owner = await Users.findOne({ 'local.email': email });

    if (!owner) {
      const { password } = req.body.customer.info;
      const { role } = req.body.customer.info.role || 2
      const newUser = new Users({
        method: 'local',
        local: { email, password },
        role
      });

      owner = await newUser.save();
    }

    location.owner = owner._id;
    const newLocation = new Location(location);
    const savedLocation = await newLocation.save();
    await Users.findByIdAndUpdate(
      { _id: owner._id },
      { $push: { locations: savedLocation._id } },
      { new: true }
    );
    return res.status(200).json({ success: true, message: MESSAGES.LOCATION_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};
