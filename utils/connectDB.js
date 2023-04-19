const dotenv = require('dotenv');
const mongoose = require('mongoose');
let chalk = require('chalk');
// import chalk from 'chalk'
dotenv.config({ path: './config.env' });

const DB = process.env.DB_URI_LOCAL;

let connected = chalk.bold.cyan;
let error = chalk.bold.red;
let warning = chalk.bold.yellow;
let termination = chalk.bold.magenta;

module.exports = () => {
  console.log('connecting to DB..');
  mongoose.connect(DB);
  mongoose.connection.on('connected', function () {
    console.log(connected('Database is connected'));
  });
  mongoose.connection.on('error', function (err) {
    console.error(error(`Error: ${err.name}, ${err.message}`));
  });
  mongoose.connection.on('disconnected', function () {
    console.warn(warning(`Warn: Database is disconnected`));
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(
        termination('Database is disconnect because of app termination')
      );
    });
  });
};
