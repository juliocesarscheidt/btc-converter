'use strict';

var request = require('request-promise-native');
var chalk = require('chalk');
var ora = require('ora');

var spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'red'
});

function convertBTC() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var url = 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=' + currency + '&amount=' + amount;

  spinner.start();
  return request(url).then(function (body) {
    spinner.stop();
    return body;
  }).then(function (body) {
    var apiResponse = JSON.parse(body);
    console.info(chalk.red(amount) + ' BTC to ' + chalk.blue(currency) + ' = ' + apiResponse.price); // eslint-disable-line
  }).catch(function (err) {
    spinner.stop();
    console.info(chalk.red('Something went wrong in the API. Try again later.')); // eslint-disable-line
    return err;
  });
}

module.exports = convertBTC;