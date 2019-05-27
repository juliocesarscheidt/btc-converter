const expect = require('chai').expect;
const exec = require('child_process').exec;
const btcConverter = './src/main.js';
const pkg = require('../package.json');

describe('Main CLI', () => {
  it('Should return version', (done) => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if (err) {
        throw err;
      }
      expect(stdout.replace(/\n/g, '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('Should return description in command --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) {
        throw err;
      }
      expect(stdout.includes('Convert Bitcoin to any currency defined')).to.be.true;
      done();
    });
  });
});