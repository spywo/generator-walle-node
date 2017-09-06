'use strict';

const _ = require('lodash');
const cfg = require('../utils/config.js');
const helper = require('../utils/helpers.js').CommonHelper;

module.exports = (paths) => {
  let defaultCleanFolders = _.clone(cfg.commander.clean);

  for (const path of paths) {
    helper.clean(path);
    defaultCleanFolders = _.remove(defaultCleanFolders, path);
  }

  for (const folder of defaultCleanFolders) {
    helper.clean(folder);
  }
}
