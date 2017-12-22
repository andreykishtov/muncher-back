const Location = require('../models/location');

module.exports = {
  getAll: async (req, res) => {
    try {
      const locations = await Location.find({}, '-__v')
      res.status(200).json({locations, message:'success'});
    } catch(error) {
      res.send(error);
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
      const location = await Locations.findById({ _id: id }, '-__v').populate([
        { path: 'userId' },
        { path: 'reviews', populate: { path: 'userId' } }
      ]);
      res.status(200).json(location);
    } catch(error) {
      res.send(error);
    }
  }
};
