const server = require('../../../app');
const http = require('http');
const Location = require('../../../models/location');
const axios = require('axios');
const faker = require('faker');
const _ = require('lodash');

let app;
let port;
let locationApi;

describe('location route', () => {
  beforeEach(() => {
    port = faker.random.number({ min: 4000, max: 6553 });
    locationApi = `http://localhost:${port}/api/v1/location/`;
    app = http.createServer(server).listen(port);
  });

  afterEach(async () => {
    await Location.remove({});
  });

  test('should return empty array when no location present', async () => {
    const { data } = await axios.get(`http://localhost:${port}/api/v1/location/`);
    expect(data.message).toBe('success');
    expect(data.locations.length).toBe(0);
  });

  test('should return five location', async () => {
    let location;
    _.times(5, async () => {
      location = {
        name: faker.lorem.word(),
        type: faker.lorem.word(),
        generalDesc: faker.lorem.word(),
        imageUrl: faker.lorem.word(),
        address: {
          country: faker.address.county(),
          city: faker.address.city(),
          street: faker.address.streetName(),
          number: faker.address.zipCode(),
          lat: faker.address.latitude(),
          lng: faker.address.longitude()
        }
      };
      await new Location(location).save();
    });
    const { data } = await axios.get(`http://localhost:${port}/api/v1/location/`);
    expect(data.message).toBe('success');
    expect(data.locations.length).toBe(5);
  });

  test('should return one location with correct data', async () => {
    const NEW_LOCATION = await new Location({ name: faker.address.streetName() }).save();
    const { data } = await axios.get(`http://localhost:${port}/api/v1/location/`);
    const { locations, updateDate, createDate } = data;
    expect(data.message).toBe('success');
    expect(_.first(locations).name).toBe(NEW_LOCATION.name);
  });
});
