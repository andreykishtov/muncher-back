const faker = require('faker');
const _ = require('lodash');

const users = _.times(6, index => ({
  method: 'local',
  local: {
    email: faker.internet.email(),
    password: '123456'
  },
  imageUrl: faker.image.imageUrl(),
  name: {
    first: faker.name.firstName(),
    last: faker.name.lastName()
  },
  reviews: ['5a3ec1d9cc90e7187d1d8877'],
  locations: [],
  role: index,
  userName: faker.internet.userName()
}));

const locations = _.times(100, () => ({
  name: faker.lorem.sentence(),
  generalDesc: faker.lorem.paragraph(),
  imageUrl: faker.image.imageUrl(),
  address: {
    country: faker.address.country(),
    city: faker.address.city(),
    street: faker.address.streetName(),
    number: faker.random.number(),
    lat: faker.address.latitude(),
    lng: faker.address.latitude()
  },
  reviews: ['5a3ec1d9cc90e7187d1d8877'],
  owner: '5a3ec1d9cc90e7187d1d8877'
}));

const reviews = _.times(100, () => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  rating: faker.random.number({ min: 0, max: 5 }),
  userId: '5a3ec1d9cc90e7187d1d8877',
  location: '5a3ec1d9cc90e7187d1d8877'
}));

var data = [
  {
    model: 'user',
    documents: users
  },
  {
    model: 'location',
    documents: locations
  },
  {
    model: 'review',
    documents: reviews
  }
];

module.exports = data;
