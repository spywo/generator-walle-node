#!/usr/bin/env node

'use strict';

const program = require('commander');
const cfg = require('../utils/config.js');
const executor = require('./executor.js');

program
  .version(cfg.commander.version)
  .option('-t --target [target]', 'target envrionment - dev|prod', /^(dev|prod)$/i, 'dev')
  .parse(process.argv);

if (program.target) {
  executor(program);
}
