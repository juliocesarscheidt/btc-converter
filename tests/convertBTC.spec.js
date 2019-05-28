const nock = require('nock');
const chai = require('chai')
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const convertBTC = require('../src/convertBTC');
const chalk = require('chalk');
chai.use(sinonChai);

describe('ConvertBTC', () => {
  let consoleStub;

  const reponseMock = {
    "price": 8790.04,
    "time": "2019-05-28 01:37:09",
    "success": true
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'info');
  });

  afterEach(() => {
    consoleStub.restore();
  })

  it('should use USD as currency and 1 as amount', async () => {
    // API => https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, reponseMock);

    await convertBTC();

    expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.blue('USD')} = 8790.04`);
  });

  it('should use USD as currency and 10 as amount', async () => {
    // API => https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, reponseMock);

    await convertBTC('USD', 10);

    expect(consoleStub).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.blue('USD')} = 8790.04`);
  });

  it('should use BRL as currency and 1 as amount', async () => {
    // API => https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, reponseMock);

    await convertBTC('BRL');

    expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.blue('BRL')} = 8790.04`);
  });

  it('should message user when api reply with error', async () => {
    // API => https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

    await convertBTC('BRL');

    expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API. Try again later.'));
  });

});
