'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('generator-git-init'));
    this.composeWith(require.resolve('../git-remote'));
    this.composeWith(require.resolve('../npm-init'), {pkgConfig: {version: '0.0.1'}});
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.bgGreen('generator-walle-node') + ' generator!'
    ));
  }

  configuring() {
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.gitattributes'), this.destinationPath('.gitattributes'));
  }
};
