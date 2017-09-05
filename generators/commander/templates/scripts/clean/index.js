#!/usr/bin/env node

const program = require('commander');
const _ = require('lodash');
const cfg = require('../utils/config.js');
const helper = require('../utils/helpers.js').CommonHelper;

program
  .version(cfg.commander.version)
  .usage('<file ...>')
  .parse(process.argv);

let defaultCleanFolders = _.clone(cfg.commander.clean);

for (const arg of program.args) {
  helper.clean(arg);
  defaultCleanFolders = _.remove(defaultCleanFolders, arg);
}

for (const arg of defaultCleanFolders) {
  helper.clean(arg);
}
