'use strict';
const path = require('path');
const fs = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-walle-node:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        const done = this.async(); // `this` is the RunContext object.
        fs.copy(path.join(__dirname, '../generators/app/templates'), dir, done);
        console.log(dir);
      })
      .withOptions({skipInstall: true})
      .withPrompts({
        remoteUrl: 'https://github.com/spywo/walle',
        name: 'walle-app',
        description: 'The description',
        version: '0.0.1',
        author: '',
        license: 'ISC'
      })
      .then(() => {
        assert.file([
          '.gitignore'
        ]);
      });
  });

  it('creates files', () => {
    assert.file([
      'package.json'
    ]);
  });
});
