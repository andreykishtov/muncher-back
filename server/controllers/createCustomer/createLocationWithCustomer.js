const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const Location = require('../../models/locations');
const Review = require('../../models/reviews');


module.exports = async (req, res) => {
  // after we got to this route and our user can create customers
  // we should start with the creation of the user

  // 1. req.body should first have user
  if(!req.body.customer){
    return;
  }

  if(!req.body.customer.info){
    return;
  }

  // 2. req.body should have location
  if(!req.body.customer.location){
    return;
  }

  // flow of creation
  const { email } = req.body.customer.info;
  const { location } = req.body.customer;

  // a. find user in our data base
  try {
  const owner = await Users.findOne({ 'local.email': email });

  if(owner) {
    // if we have the user in our database we should take him out
    // and use him to create the new location

    // we are assuming that the location has all the information
    // as it will pass the joi validation

    // add the owner id into location object as we got in in the customer
    location.owner = owner._id;

    const newLocation  = new Location(location);
    const savedLocation = await newLocations.save();
    Users.findByIdAndUpdate({ _id:owner._id }, { $push: { location: savedLocation._id } }, { new: true });
    res.status(200).json({ success: true, message: 'Location added to user' })
  }

  // b. go into location model and create location with created user above
  // c. add the location back into user array of location (user can have more then one location)
  // d. only the user of the location / moderator / dev / admin can modify the location
  // e. user should not have option to delete the location he can only submit a ticket for it


    res.status(200).json({ success: true, message: 'Some magic will happen here' })
  } catch(error) {
    console.log(error);
  }
};


