const request = require('request-promise-native');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'red',
});

function convertBTC(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  spinner.start();
  return request(url)
    .then((body) => {
      spinner.stop();
      return body;
    })
    .then((body) => {
      const apiResponse = JSON.parse(body);
      console.info(`${chalk.red(amount)} BTC to ${chalk.blue(currency)} = ${apiResponse.price}`); // eslint-disable-line
    })
    .catch((err) => {
      spinner.stop();
      console.info(chalk.red('Something went wrong in the API. Try again later.')); // eslint-disable-line
      return err;
    });
}

module.exports = convertBTC;
