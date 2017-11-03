module.exports = {
  register: require('./register'),
  login: require('./login'),
  getUser: require('./getUser'),
  updateUser: require('./updateUser'),
  deleteUser: require('./deleteUser'),
  test: async (req, res) => {
    res.json({ secret: 'resource' });
  }
}
