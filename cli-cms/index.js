const program = require('commander');
const faker = require('faker');
const { createCustomerWithLocation } = require('../server/controllers/createCustomer/');

const types = ['restaurant-reservation', 'take-away', 'order-home']

const customer = {
  "body": {
    "customer": {
      "info": {
        "email": faker.internet.email(),
        "password": "muncher"

      },
      "location": {
        "name": faker.name.findName(),
        "type": types[faker.random.number({ min: 0, max: 3 })],
        "generalDesc": faker.lorem.sentence(),
        "address": {
          "country": faker.address.country(),
          "city": faker.address.city(),
          "street": faker.address.streetAddress(),
          "number": faker.random.number(),
          "lat": faker.address.latitude(),
          "lng": faker.address.longitude()
        }
      }
    }

  }
}



program
  .version('0.0.1')
  .description('Muncher Cli CMS')


program
  .command('add')
  .alias('a')
  .description('add fake customer with location')
  .action(async () => {
    try {
      await createCustomerWithLocation(customer)
      console.log('added');
    }
    catch(e) {
      console.log('error adding customer with location', e)
    }

  })

program.parse(process.argv);
