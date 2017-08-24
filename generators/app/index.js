'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.npmOptions = {
			// Skip prompts
			'skip-name': false,
			'skip-description': false,
			'skip-version': false,
			'skip-main': true,
			'skip-test': true,
			'skip-repo': false,
			'skip-keywords': false,
			'skip-author': false,
			'skip-license': false,

			version: '0.0.0',
			description: '',
			test: 'echo "Error: no test specified" && exit 1',
			keywords: [],
			author: '',
			license: 'ISC'
		};
	}

	initializing() {
		this.composeWith(require.resolve('generator-git-init'));
		this.composeWith(require.resolve('generator-git-remote'));
		this.composeWith(require.resolve('generator-npm-init'), this.npmOptions);
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the dazzling ' + chalk.bgGreen('generator-walle-node') + ' generator!'
		));
	}
};
