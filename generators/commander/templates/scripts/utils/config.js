'use strict';
const path = require('path');

class Configuration {
  constructor() {
    this.commanderVersion = '0.1.0';
    this.logLevel = 'debug';
    this.appRootPath = path.resolve(process.cwd());
  }
};

module.exports = new Configuration();
