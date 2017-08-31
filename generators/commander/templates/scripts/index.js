'use strict';
const cp = require('child_process');
const path = require('path');
const logger = require('./utils/logger.js').getLogger('Commander');

if (process.argv.length < 3) {
    logger.fatal(`Invalid commander! \n Usage: node scripts cmd [args ...] <optional args ...> <value ...>`);
    process.exit(1);
}

const command = process.argv[2];
const args = process.argv.slice(3);

logger.info(`Inovking: ${command} ${args.join(' ')}`);
cp.fork(path.resolve(__dirname, command), args);
