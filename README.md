# Bitcoin Converter

[![Build Status](https://badgen.net/travis/julio-cesar-development/btc-converter?icon=travis)](https://travis-ci.org/julio-cesar-development/btc-converter)
![Version](https://badgen.net/npm/v/btc-converter-v2)
[![Coverage Status](https://coveralls.io/repos/github/julio-cesar-development/btc-converter/badge.svg?branch=master)](https://coveralls.io/github/julio-cesar-development/btc-converter?branch=master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

> This is a CLI tool to convert from Bitcoin to any currency

## Instructions

* Can be downloaded through [NPM](https://www.npmjs.com/package/btc-converter-v2)

```bash
npm i -g btc-converter-v2
```

* Or cloned and then builded

```bash
git clone https://github.com/julio-cesar-development/btc-converter.git
cd btc-converter
npm i
npm run build
npm run link
```

## Use

* Must be executed through command line

```bash
btc-converter [options]
```

* The tool accepts some options:
  * -C --currency | the currency to be converted
  * -A --amount | the amount to be converted
