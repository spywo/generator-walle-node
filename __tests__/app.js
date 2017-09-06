'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const _ = require('lodash');

describe('Initiate the project by default', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function(dir) {
        console.log(dir);
      })
      .withOptions({ skipInstall: true })
      .withPrompts({ license: 'ISC' });
  });

  it('should generate files', () => {
    assert.file([
      'package.json',
      '.gitattributes',
      '.gitignore',
      'LICENSE',
      'index.js'
    ]);
  });

  it('should generate the correct package.json', () => {
    assert.jsonFileContent('package.json',
      _.extend({},
        {
          version: '0.0.1',
          description: '',
          main: 'index.js',
          scripts: {
            test: 'echo "Error: no test specified" && exit 1'
          },
          keywords: [],
          repository: {
            type: 'git',
            url: ''
          },
          license: 'ISC'
        }
      ));
  });
});

describe('Initiate the project by default without git', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function(dir) {
        console.log(dir);
      })
      .withOptions({ skipInstall: true })
      .withPrompts({ git: false, license: 'MIT' });
  });

  it('should have no `.git` folder and other git related files', () => {
    assert.noFile(['.git', '.gitattributes', '.gitignore']);
  });

  it('should have no `repository` in package.json', () => {
    assert.noJsonFileContent('package.json', { repository: {} });
  });
});

describe('Initiate the project by customized attributes', () => {
  const mainEntry = 'server123.js';
  const author = {
    name: 'Oliver',
    email: 'oliver@hhh.com',
    website: 'https://oliver.com'
  };
  const test = 'jest';
  const remoteUrl = 'https://git.com';

  const prompts = {
    remoteUrl: remoteUrl,
    name: 'walle-app',
    description: 'The dummy description',
    version: '1.0.1',
    main: mainEntry,
    'author.name': author.name,
    'author.email': author.email,
    'author.website': author.website,
    'scripts.test': test,
    keywords: ['walle', 'app'],
    license: 'MIT'
  };

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function(dir) {
        console.log(dir);
      })
      .withOptions({ skipInstall: true })
      .withPrompts(prompts);
  });

  it('should generate files', () => {
    assert.file([
      'package.json',
      '.gitattributes',
      '.gitignore',
      'LICENSE',
      mainEntry
    ]);
  });

  it('should generate the correct package.json', () => {
    delete prompts.remoteUrl;
    delete prompts['author.name'];
    delete prompts['author.email'];
    delete prompts['author.website'];
    delete prompts['scripts.test'];

    assert.jsonFileContent('package.json',
      _.merge({},
        prompts,
        {
          scripts: {
            test: test
          },
          author: author,
          repository: {
            type: 'git',
            url: remoteUrl
          }
        }
      ));
  });
});

