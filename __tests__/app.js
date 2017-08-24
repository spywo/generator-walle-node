'use strict';
var path = require('path');
var fs = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-walle-node:app', () => {
	beforeAll(() => {
		return helpers.run(path.join(__dirname, '../generators/app'))
			.inTmpDir(function (dir) {
				var done = this.async(); // `this` is the RunContext object.
				fs.copy(path.join(__dirname, '../generators/app/templates'), dir, done);
				console.log(dir);
			})
			.withOptions({skipInstall: true})
			.withPrompts({
				remoteUrl: 'https://github.com/spywo/walle',
				name: 'walleApp',
				description: 'The description',
				version: '0.0.1',
				author: '',
				license: 'ISC'
			})
			.then(function () {
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
