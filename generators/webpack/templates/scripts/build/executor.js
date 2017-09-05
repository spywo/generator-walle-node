'use strict';

const merge = require('webpack-merge');
const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');
const cfg = require('../utils/config.js');
const logger = require('../utils/logger.js').getLogger('Webpack');
const helper = require('../utils/helpers.js').CommonHelper;

module.exports = (in_options) => {
  let wpc = require(path.resolve(cfg.configPath, 'webpack.config.js'))(cfg.webpack);

  const wpc_common = require(path.resolve(cfg.configPath, 'webpack.config.common.js'))(cfg.webpack);

  logger.info(`Merging webpack common configuration...`);
  wpc = merge(wpc_common, wpc);
  if (in_options.target === 'prod') {
    logger.info(`Merging webpack production configuration...`);
    const wpc_prod = require(path.resolve(cfg.configPath, 'webpack.config.prod.js'))(cfg.webpack);
    wpc = merge(wpc_prod, wpc);
  } else {
    logger.info(`Merging webpack development configuration...`);
    const wpc_dev = require(path.resolve(cfg.configPath, 'webpack.config.dev.js'))(cfg.webpack);
    wpc = merge(wpc_dev, wpc);
  }

  helper.output(`webpack.config.${in_options.target}.json`, JSON.stringify(wpc, null, 2));

  webpack(wpc).run((err, stats) => {
    if (err) {
      logger.error(`Failed to build by webpack!`, err);
    } else {
      if (stats.hasErrors()) {
        logger.error(stats.compilation.errors);
      }
      if (stats.hasWarnings()) {
        logger.warn(stats.compilation.warnings);
      }
    }
  });
}
