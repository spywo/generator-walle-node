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
                build: buildCmd,
            },
        });

        this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }

    install() {
        this.npmInstall(['log4js'], { 'save-dev': true });
        this.npmInstall(['fs-extra, lodash'], { 'save-dev': true });
    }

    end() {
        this.log(chalk.bgGreen(`Create commanders done!`));
    }
};
