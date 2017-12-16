const program = require('commander');
const { prompt } = require('inquirer');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { createCustomerWithLocation } = require('../server/controllers/createCustomer/');
const { register } = require('../server/controllers/users/');
const { fake_customerWithLocation, fake_user } = require('./constants');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost/muncher', { useMongoClient: true });
const log = console.log;

const questions = [
  {
    type: 'list',
    name: 'payload',
    message: 'What would you like to add?',
    choices: ['user', 'customer-with-location', 'exit']
  }
];

const response = {
  json: function(e) {
    log(chalk.green(JSON.stringify(e)));
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
      const answer = await prompt(questions);
      switch (answer.payload) {
        case 'customer-with-location':
          await createCustomerWithLocation(fake_customerWithLocation, response);
          db.close();
          return process.exit(0);

        case 'user':
          await register(fake_user, response);
          db.close();
          return process.exit(0);

        default:
          log(chalk.red('No action taken'));
          db.close();
          return process.exit(0);
      }
    } catch (e) {
      log(chalk.red('error adding customer with location'), e);
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
