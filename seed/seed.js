const seeder = require('mongoose-seed');
const data = require('./data.js');
const _ = require('lodash');
const Users = require('../server/models/users');
const Location = require('../server/models/locations');
const Review = require('../server/models/reviews');
let reviews, users, locations;

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/muncher', function() {
  // Load Mongoose models
  seeder.loadModels(['server/models/users.js', 'server/models/locations.js', 'server/models/reviews.js']);

  // Clear specified collections
  seeder.clearModels(['user', 'location', 'review'], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, async () => {
      try {
        reviews = await Review.find({});
        users = await Users.find({});
        locations = await Location.find({});

        // add all locations to Owner type
        const ownerType = users[1];
        await Users.findByIdAndUpdate({ _id: ownerType._id }, { locations, reviews: [] }, { new: true });

        // add all review to User type
        const userType = users[0];
        await Users.findByIdAndUpdate({ _id: userType._id }, { reviews, locations: [] }, { new: true });

        // update each location with owner id
        _.forEach(locations, location => {
          try {
            return Location.findByIdAndUpdate({ _id: location._id }, { owner: ownerType._id });
          } catch (error) {
            console.log('error at updating location', error);
          }
        });

        // for each review add the user type as its owner and add location id
        _.forEach(reviews, (review, index) => {
          try {
            return Review.findByIdAndUpdate({ _id: review._id }, { userId: userType._id, location: locations[index]._id });
          } catch (e) {
            console.log(`error at updating review index: ${index}, error: ${e}`);
          }
        });
      } catch (e) {
        console.log(e);
      }

      seeder.disconnect();
    });
  });
});
