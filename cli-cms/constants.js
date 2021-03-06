const faker = require('faker');

const types = ['restaurant-reservation', 'take-away', 'order-home'];
const fake_customerWithLocation = {
  body: {
    customer: {
      info: {
        email: faker.internet.email(),
        password: 'muncher'
      },
      location: {
        name: faker.name.findName(),
        type: types[faker.random.number({ min: 0, max: 3 })],
        generalDesc: faker.lorem.sentence(),
        imageUrl: faker.image.imageUrl(),
        address: {
          country: faker.address.country(),
          city: faker.address.city(),
          street: faker.address.streetAddress(),
          number: faker.random.number(),
          lat: faker.address.latitude(),
          lng: faker.address.longitude()
        }
      }
    }
  }
};

const fake_user = (role) => ({
  value:{
    body: {
      email: faker.internet.email(),
      password: 'muncher',
      role: role
    }
  }
});

module.exports = {
  fake_customerWithLocation,
  fake_user,
  types
};
