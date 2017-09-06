#!/usr/bin/env node

'use strict';

const program = require('commander');
const cfg = require('../utils/config.js');
const executor = require('./executor.js');

program
  .version(cfg.commander.version)
  .usage('<file ...>')
  .parse(process.argv);

executor(program.args);
