#!/usr/bin/env node

const program = require('commander');
const cfg = require('../utils/config.js');
const helper = require('../utils/helpers.js').CommonHelper;

program
  .version(cfg.commanderVersion)
  .usage('<file ...>')
  .parse(process.argv);

for (const arg of program.args) {
  helper.clean(arg);
}
