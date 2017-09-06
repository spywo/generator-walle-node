'use strict';

const path = require('path');

/**
 * The common project configuration.
 * @class
 */
module.exports = class {
  constructor() {

    this.logLevel = 'debug';

    /** path */
    this.appRootPath = path.resolve(process.cwd());
    this.outputPath = path.resolve(this.appRootPath, 'target');                              // The output folder is like 'target' folder in maven
    this.distPath = path.resolve(this.appRootPath, 'dist');                                  // The distribution folder
    this.configPath = path.resolve(this.appRootPath, 'config');                              // The configuration folder that maintains all the project configuration
    this.srcPath = path.resolve(this.appRootPath, 'src');

    /** commander */
    this.commander = {
      version: '0.1.0',
      path: path.resolve(this.appRootPath, 'scripts'),
      clean: [this.outputPath]
    }
  }
};
