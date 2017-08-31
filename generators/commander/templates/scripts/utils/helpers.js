'use strict';
const logger = require('./logger.js').getLogger('Helper');
const fs = require('fs-extra');

module.exports.CommandHelper = class {
  static collect(val, memo) {
    memo.push(val);
    return memo;
  }
};

module.exports.CommonHelper = class {
  static clean(path) {
    logger.info(`Removing ${path}`);
    if (fs.existsSync(path)) {
      fs.removeSync(path);
    } else {
      logger.warn(`Not found ${path}`);
    }
  }
};
