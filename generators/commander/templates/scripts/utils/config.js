'use strict';

const path = require('path');
const _ = require('lodash');

/**
 * The project configuration merged by defulat configration, customized configuration and etc.
 * @class
 */
class Configuration {
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

    /** babel */
    this.babel = {
      babelrcPath: path.resolve(this.configPath, '.babelrc')
    }

    /** webpack */
    this.webpack = {
      entry: path.resolve(this.srcPath, 'index.js'),
      babelrcPath: this.babel.babelrcPath,
      output: {
        filename: 'bundle.js',
        path: this.distPath,
        publicPath: `/${this.distPath}`,
        libraryTarget: 'umd',
        library: 'BUNDLE'
      },
      devServer: {
        contentBase: path.resolve(this.outputPath, 'example'),
        publicPath: `/${this.distPath}`,
        compress: true,
        hot: true,
        port: 9000
      }
    }
  }
};

module.exports = _.merge(new Configuration(), {
  webpack: {
    devtool: 'source-map'
  }
});
