const Location = require('../models/locations');
const User = require('../models/users');

module.exports = {
  getAll: async (req, res) => {
    try {
      const locations = await Location.find({}, '-__v')
      res.status(200).json({locations, message:'success'});
    } catch(error) {
      res.status(200).json({message: 'Could not get all locations'});
    }
  },

  addLocation: async (req, res) => {
    try {
      const location = await new Location(req.body).save();
      res.status(200).json({ location, message: MESSAGES.LOCATION_SUCCESS });
    } catch(error) {
      res.send(error);
    }
  },

  getLocation: async (req, res) => {
    try {
      const {id} = req.params;


      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(200).json({message: 'location id not valid'});
      }

      const user = await User.findById(id);
      const location = await Location.findById({ _id: id }, '-__v')
      .populate('owner', 'name -_id')
      .populate('reviews');

      if(!location){
        return res.status(200).json({message: 'no location found'});
      }

      res.status(200).json(location);
    } catch(error) {
      console.log(error);
      res.status(200).json({message: 'No location with request id found'});
    }
  }
};
