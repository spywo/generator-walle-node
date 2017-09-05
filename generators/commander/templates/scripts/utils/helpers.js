'use strict';

const path = require('path');
const fs = require('fs-extra');
const cfg = require('./config.js');
const logger = require('./logger.js').getLogger('Helper');

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

  /**
   * Wirte the data to the file in `${cfg.outputPath}` folder.
   *
   * @param {Object} in_filename - The file name
   * @param {Object} in_data - The data
   */
  static output(in_filename, in_data) {
    if (!fs.existsSync(cfg.outputPath)) {
      logger.info(`Creating output folder: ${cfg.outputPath}`);
      fs.mkdirSync(cfg.outputPath);
    }

    const filePath = path.resolve(cfg.outputPath, in_filename);
    fs.writeFileSync(filePath, in_data);
    logger.info(`Successfully write to ${filePath}`);
  }
};
