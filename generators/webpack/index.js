'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(chalk.white('Generating webpack files...'));
  }

  configuring() {
    this.fs.copy(this.templatePath('scripts'), this.destinationPath('scripts'));
    this.fs.copy(this.templatePath('config'), this.destinationPath('config'));
    this.fs.copy(this.templatePath('config/.babelrc'), this.destinationPath('config/.babelrc'));
  }

  install() {
    this.npmInstall(['fs-extra'], { 'save-dev': true });

    this.npmInstall(['webpack', 'webpack-dev-server', 'webpack-merge'], { 'save-dev': true });
    this.npmInstall(['url-loader', 'style-loader', 'sass-loader', 'file-loader', 'css-loader'], { 'save-dev': true });
    this.npmInstall(['babel', 'babel-loader', 'babel-register', 'babel-polyfill', 'babel-preset-es2015', 'babel-plugin-istanbul', 'babel-plugin-syntax-dynamic-import', 'babel-plugin-transform-async-to-generator'], { 'save-dev': true });
  }

  end() {
    this.log(chalk.bgGreen(`Webpack has been configured!`));
  }
};
