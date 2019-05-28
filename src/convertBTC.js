const request = require('request');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'red',
});

function convertBTC(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  spinner.start();
  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try again later.')); // eslint-disable-line
      return parseError;
    }
    console.log(`${chalk.red(amount)} BTC to ${chalk.blue(currency)} = ${apiResponse.price}`); // eslint-disable-line
    return apiResponse;
  });
}

module.exports = convertBTC;
