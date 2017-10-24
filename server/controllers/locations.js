const Locations = require('../models/locations');

module.exports = {
    getLocations: async (req, res) => {
        try {
            const locations = await Locations.find({}, '-__v').populate([
                { path: 'userId' },
                { path: 'reviews' }
            ]);
            res.status(200).json(locations);
        } catch (error) {
            res.send(error);
        }
    },
    addLocation: async (req, res) => {
        try {
            const newLocations = new Locations(req.body);
            const location = await newLocations.save();
            res.status(200).json({ location, message: MESSAGES.LOCATION_SUCCESS });
        } catch (error) {
            res.send(error);
        }
    },
    getLocation: async (req, res) => {
        try {
            const homeId = req.params.homeId;
            const location = await Locations.findById({ _id: homeId }, '-__v').populate([
                { path: 'userId' },
                { path: 'reviews', populate: { path: 'userId' } }
            ]);
            res.status(200).json(location);
        } catch (error) {
            res.send(error);
        }
    }
};
