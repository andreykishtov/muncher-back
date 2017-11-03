module.exports = {
  register: require('./register'),
  login: require('./login'),
  getUser: require('./getUser'),
  test: async (req, res) => {
    res.json({ secret: 'resource' });
  }
}