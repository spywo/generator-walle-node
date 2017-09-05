'use strict';

const log4js = require('log4js');
const cfg = require('./config.js');

log4js.configure({
  appenders: {
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['console'], level: 'trace' }
  }
});

module.exports = class {
  static getLogger(in_name) {
    const logger = log4js.getLogger(in_name);
    logger.level = cfg.logLevel
    return logger;
  }
};
