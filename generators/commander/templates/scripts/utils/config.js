'use strict';

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const CommonConfiguration = require('./cfg/common.cfg.js');

let cfg = new CommonConfiguration();

const cfgFolder = path.resolve(cfg.commander.path, 'utils/cfg');
fs.readdirSync(cfgFolder).forEach(file => {
  const match = new RegExp(/\.cfg.js$/g);
  if (match.test(file)) {
    const Configuration = require(path.resolve(cfgFolder, file));
    cfg = _.merge(cfg, new Configuration());
  }
});

module.exports = cfg;
