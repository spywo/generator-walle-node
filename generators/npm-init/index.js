'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const path = require('path');
const ini = require('ini');

module.exports = class extends Generator {
  initializing() {
    this.props = {};

    const defaults = {
      name: path.basename(this.destinationRoot()),
      version: '0.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1'
      },
      keywords: [],
      author: {
        name: this.user.git.name(),
        email: this.user.git.email()
      }
    };

    const options = _.extend({}, this.options.pkgConfig);

    const pkg = this.fs.readJSON('package.json');

    _.merge(
      this.props,
      defaults,
      options,
      pkg);
  }

  prompting() {
    const done = this.async();
    const prompts = [];

    prompts.push({
      name: 'name',
      message: 'name:',
      default: this.props.name
    });

    prompts.push({
      name: 'version',
      message: 'version:',
      default: this.props.version
    });

    prompts.push({
      name: 'description',
      message: 'description:',
      default: this.props.description
    });

    prompts.push({
      type: 'confirm',
      name: 'enableMain',
      message: 'Would you like to enable the main entry point?',
      default: 'Y/n'
    });

    prompts.push({
      when: props => {
        const isEnabled = props.enableMain;
        delete props.enableMain;
        return isEnabled;
      },
      type: 'input',
      name: 'main',
      message: 'main entry point:',
      default: this.props.main
    });

    prompts.push({
      name: 'scripts.test',
      message: 'test command:',
      default: this.props.scripts.test,
      store: true
    });

    prompts.push({
      name: 'keywords',
      message: 'keywords (comma-delimited):',
      default: this.props.keywords ? this.props.keywords.join(',') : '',
      filter(words) {
        return _.isEmpty(words) ? [] : words.split(/\s*,\s*/g);
      }
    });

    prompts.push({
      name: 'author.name',
      message: 'author:',
      default: this.props.author.name
    });

    prompts.push({
      name: 'author.email',
      message: 'author\'s email:',
      default: this.props.author.email
    });

    prompts.push({
      name: 'author.website',
      message: 'author\'s website:',
      default: this.props.author.website
    });

    this.prompt(prompts).then(props => {
      this.props = _.merge(this.props, props);

      done();
    });
  }

  configuring() {
    if (this.props.main) {
      const file = this.destinationPath(this.props.main);
      if (!this.fs.exists(file)) {
        this.fs.write(file, '');
      }
    }
  }

  default() {
    this.composeWith(require.resolve('generator-license/app'), {
      name: this.props.author.name,
      email: this.props.author.email,
      website: this.props.author.website
    });
  }

  writing() {
    if (this.fs.exists(this.destinationPath('.git/config'))) {
      const gitConfigIni = this.fs.read(this.destinationPath('.git/config'));

      if (gitConfigIni) {
        const gitConfig = ini.parse(gitConfigIni);
        this.props.repository = {
          type: 'git',
          url: gitConfig['remote "origin"'] ? gitConfig['remote "origin"'].url : ''
        };
      }
    }
    this.fs.writeJSON(this.destinationPath('package.json'), this.props);
  }

  end() {
    this.log(chalk.bgGreen(`npm init done!`));
  }
};
