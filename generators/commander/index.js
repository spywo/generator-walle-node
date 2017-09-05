'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    this.log(chalk.white('Generating commander files...'));
  }

  configuring() {
    this.fs.copy(this.templatePath('scripts'), this.destinationPath('scripts'));
    this.fs.copy(this.templatePath('config'), this.destinationPath('config'));
  }

  writing() {
    const pkg = this.fs.readJSON('package.json');

    // Clean commander
    let cleanCmd = pkg.scripts && pkg.scripts.clean;
    if (!cleanCmd) {
      cleanCmd = 'node scripts clean';
    }

    // Build commander
    let buildCmd = pkg.scripts && pkg.scripts.build;
    if (!buildCmd) {
      buildCmd = 'node scripts build';
    }

    _.merge(pkg, {
      scripts: {
        clean: cleanCmd,
        build: buildCmd
      }
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  install() {
    this.npmInstall(['log4js'], { 'save-dev': true });
    this.npmInstall(['fs-extra, lodash'], { 'save-dev': true });

    this.npmInstall(['webpack', 'webpack-dev-server', 'webpack-merge'], { 'save-dev': true });
    this.npmInstall(['url-loader', 'style-loader', 'sass-loader', 'file-loader', 'css-loader'], { 'save-dev': true });
    this.npmInstall(['babel', 'babel-loader', 'babel-register', 'babel-polyfill', 'babel-preset-es2015', 'babel-plugin-istanbul', 'babel-plugin-syntax-dynamic-import', 'babel-plugin-transform-async-to-generator'], { 'save-dev': true });
  }

  end() {
    this.log(chalk.bgGreen(`Create commanders done!`));
  }
};


