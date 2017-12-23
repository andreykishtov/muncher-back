const http = require('http');
const axios = require('axios');
const faker = require('faker');
const _ = require('lodash');

const server = require('../../../app');
const Location = require('../../../models/locations');
const User = require('../../../models/users');

let APP, PORT, LOCATION_API;

describe('location', () => {
  beforeAll(async () => {
    await Location.remove({});
    await User.remove({});
    PORT = faker.random.number({ min: 4000, max: 6553 });
    LOCATION_API = `http://localhost:${PORT}/api/v1/location`;
    APP = http.createServer(server).listen(PORT);
  });

  afterEach(async () => {
    await Location.remove({});
    await User.remove({});
  });

  afterAll(() => {
    APP.close();
  });

  describe('index', () => {
    test('should return empty array when no location present', async () => {
      const response = await axios.get(LOCATION_API);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('success');
      expect(response.data.locations.length).toBe(0);
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
  });

  describe('by id', () => {
    test('should return single location with owner', async () => {
      const NEW_OWNER = await new User({
        name: { first: faker.name.lastName(), last: faker.name.lastName() },
        method: 'local',
        local: {
          email: faker.internet.email(),
          password: faker.internet.password()
        }
      }).save();
      const NEW_LOCATION = await new Location({ name: faker.address.streetName(), owner: NEW_OWNER._id }).save();
      const { data } = await axios.get(`${LOCATION_API}/${NEW_LOCATION._id}`);
      const { _id, name, owner, reviews } = data;

      expect(_id).toEqual(_.toString(NEW_LOCATION._id));
      expect(name).toBe(NEW_LOCATION.name);
      expect(owner.name.first).toEqual(NEW_OWNER.name.first);
      expect(owner.name.last).toEqual(NEW_OWNER.name.last);
    });

    test('should return id not valid', async () => {
      const { data } = await axios.get(`${LOCATION_API}/notValidId`);
      expect(data.message).toBe('location id not valid');
    });
  });
});
