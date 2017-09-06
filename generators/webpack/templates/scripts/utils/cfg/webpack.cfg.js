'use strict';

const path = require('path');
const CommonConfiguration = require('./common.cfg.js');
const _ = require('lodash');

/**
 * The webpack default configuration.
 * @class
 */
module.exports = class extends CommonConfiguration {
  constructor() {
    super();

    /** babel */
    this.babel = {
      babelrcPath: path.resolve(this.configPath, '.babelrc')
    }

    /** webpack */
    this.webpack = {
      entry: path.resolve(this.srcPath, 'index.js'),
      babelrcPath: this.babel.babelrcPath,
      devtool: 'source-map',
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
