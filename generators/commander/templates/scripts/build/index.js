#!/usr/bin/env node

const program = require('commander');
const merge = require('webpack-merge');
const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');
const cfg = require('../utils/config.js');
const logger = require('../utils/logger.js').getLogger('Build');
const helper = require('../utils/helpers.js').CommonHelper;

function mergeWebpack(in_target) {
  let wpc = require(path.resolve(cfg.configPath, 'webpack.config.js'))(cfg.webpack);

  const wpc_common = require(path.resolve(cfg.configPath, 'webpack.config.common.js'))(cfg.webpack);

  logger.info(`Merging webpack common configuration...`);
  wpc = merge(wpc_common, wpc);
  if (in_target === 'prod') {
    logger.info(`Merging webpack production configuration...`);
    const wpc_prod = require(path.resolve(cfg.configPath, 'webpack.config.prod.js'))(cfg.webpack);
    wpc = merge(wpc_prod, wpc);
  } else {
    logger.info(`Merging webpack development configuration...`);
    const wpc_dev = require(path.resolve(cfg.configPath, 'webpack.config.dev.js'))(cfg.webpack);
    wpc = merge(wpc_dev, wpc);
  }

  helper.output('webpack.config.json', JSON.stringify(wpc, null, 2));

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
program
  .version(cfg.commander.version)
  .option('-t --target [target]', 'target envrionment - dev|prod', /^(dev|prod)$/i, 'dev')
  .parse(process.argv);

if (program.target) {
  mergeWebpack(program.target);
}
