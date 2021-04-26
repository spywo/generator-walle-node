'use strict';
const Generator = require('yeoman-generator');
const fs = require('fs-extra');

module.exports = class extends Generator {
    prompting() {
        const done = this.async();

        // It seems `this.fs` doesn't release the file, which cause the git remote
        // doesn't sync to the memory.
        const prompts = [
            {
                when: () => fs.pathExistsSync(this.destinationPath('.git/config')),
                name: 'remoteUrl',
                message: 'git remote url (origin):',
            },
        ];

        return this.prompt(prompts).then(props => {
            if (props.remoteUrl) {
                this.spawnCommandSync('git', ['remote', 'add', 'origin', props.remoteUrl]);
            }
            done();
        });
    }
};
