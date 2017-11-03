module.exports = {
  register: require('./register'),
  login: require('./login'),
  getUser: require('./getUser'),
  updateUser:require('./updateUser'),
  test: async (req, res) => {
    res.json({ secret: 'resource' });
  }
}