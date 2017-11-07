const MESSAGES = require('../../helpers/messages');
const Users = require('../../models/users');
const Location = require('../../models/locations');
const Reviews = require('../../models/reviews');


module.exports = async (req, res) => {
  console.log('shit');
  // 1. req.body should first have user
  // 2. req.body should have location
  // 3. req.body should have token / id with a role of dev / mode / admin

  // flow of creation

  // a. go into user model and create user
  // b. go into location model and create location with created user above
  // c. add the location back into user array of location (user can have more then one location)
  // d. only the user of the location / moderator / dev / admin can modify the location
  // e. user should not have option to delete the location he can only submit a ticket for it

  try {
    await console.log(req.body);
    res.status(200).json({magic:'magin'})
  } catch(error) {
    console.log(error);
  }
};


