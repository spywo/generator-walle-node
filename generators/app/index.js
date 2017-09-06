'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs-extra');

module.exports = class extends Generator {
  initializing() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.bgGreen('generator-walle-node') + ' generator!'
    ));
  }

  prompting() {
    if (fs.pathExistsSync(this.destinationPath('.git'))) {
      return Promise.resolve();
    }
    return this.prompt([{
      type: 'confirm',
      name: 'git',
      message: 'Would you like to enable git?',
      default: 'Y/n'
    }]).then(answers => {
      if (answers.git) {
        this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('.gitattributes'), this.destinationPath('.gitattributes'));

        this.composeWith(require.resolve('generator-git-init'));
        this.composeWith(require.resolve('../git-remote'));
      }
    });
  }

  default() {
    this.composeWith(require.resolve('../npm-init'), {pkgConfig: {version: '0.0.1'}});
  }
};
