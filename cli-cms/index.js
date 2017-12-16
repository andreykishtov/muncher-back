const program = require('commander');
const { prompt, Separator } = require('inquirer');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { createCustomerWithLocation } = require('../server/controllers/createCustomer/');
const { register } = require('../server/controllers/users/');
const { fake_customerWithLocation, fake_user, types } = require('./constants');
const _ = require('lodash');
const faker = require('faker');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost/muncher', { useMongoClient: true });
const log = console.log;

const add_questions = [
  {
    type: 'list',
    name: 'add',
    message: 'What would you like to add?',
    choices: ['admin', 'user', 'customer-with-location', '30-customers-with-locations', new Separator(), 'exit']
  }
];

const response = {
  json: function(e) {
    log(chalk.green(JSON.stringify(e, null, 2)));
    return this;
  },
  status: function() {
    return this;
  }
};

program.version('0.0.1').description('Muncher Cli CMS');

program
  .command('add')
  .alias('a')
  .description('Add items to our app')
  .action(async () => {
    try {
      const answer = await prompt(add_questions);
      switch (answer.add) {
        case 'customer-with-location':
          await createCustomerWithLocation(fake_customerWithLocation, response);
          db.close();
          return process.exit(0);
        case '30-customers-with-locations':
          let counter = 30;
          while (counter) {
            await createCustomerWithLocation(
              {
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
              },
              response
            );
            counter--;
            log(chalk.cyan('Left', counter));
          }
          db.close();
          return process.exit(0);
        case 'user':
          await register(fake_user(1), response);
          db.close();
          process.exit(0);

        case 'admin':
          await register(fake_user(6), response);
          db.close();
          process.exit(0);

        default:
          log(chalk.red('Existing - No action taken'));
          db.close();
          process.exit(0);
      }
    } catch (e) {
      log(chalk.red('Error adding'), e);
      db.close();
      process.exit(1);
    }
  });

// time out for program to close if not action was taken
setTimeout(() => {
  log(chalk.magenta('Program closed after 10 sec'));
  db.close();
  process.exit(0);
}, 5000);
program.parse(process.argv);
