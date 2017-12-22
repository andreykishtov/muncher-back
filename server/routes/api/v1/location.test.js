const server = require('../../../app');
const http = require('http');
const Location = require('../../../models/location');
const axios = require('axios');
const faker = require('faker');
const _ = require('lodash');

let APP, PORT, LOCATION_API;

describe('location route', () => {
  beforeEach(() => {
    PORT = faker.random.number({ min: 4000, max: 6553 });
    LOCATION_API = `http://localhost:${PORT}/api/v1/location/`;
    APP = http.createServer(server).listen(PORT);
  });

  afterEach(async () => {
    await Location.remove({});
  });

  afterEach(() => {
    APP.close();
  });

  test('should return empty array when no location present', async () => {
    const { data } = await axios.get(LOCATION_API);
    expect(data.message).toBe('success');
    expect(data.locations.length).toBe(0);
  });

  test('should return all locations (5)', async () => {
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
    const { data } = await axios.get(LOCATION_API);
    expect(data.message).toBe('success');
    expect(data.locations.length).toBe(5);
  });

  test('should return one location with correct data', async () => {
    const NEW_LOCATION = await new Location({ name: faker.address.streetName() }).save();
    const { data } = await axios.get(LOCATION_API);
    const { locations, updateDate, createDate } = data;
    expect(data.message).toBe('success');
    expect(_.first(locations).name).toBe(NEW_LOCATION.name);
  });
});
