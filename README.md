# generator-walle-node [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> It generates the node application with basic files from scratch.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-walle-node using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```
Change to `generator-walle-node` folder, then run `npm link`.

Then generate your new project:

```bash
yo walle-node
```

## Getting To Know walle-node

walle-node is the main generator which leverages the sub generators to generates the application from scratch.

```
D:\Working\sources\git\misc\test\test\newgen>yo walle-node

     _-----_     ?──────────────────────────?
    |       |    │  Welcome to the dazzling │
    |--(o)--|    │   generator-walle-node   │
   `---------'   │        generator!        │
    ( _'U`_ )    ?──────────────────────────?
    /___A___\   /
     |  ~  |
   __'.___.'__
 '   `  |° ' Y `

? Would you like to enable git? Yes
? git remote url (origin): https://github.com/helloworld
? name: newgen
? version: 0.0.1
? description: The sample app
? Would you like to enable the main entry point? Yes
? main entry point: index.js
? test command: echo "Error: no test specified" && exit 1
? keywords (comma-delimited): Sample,App
? author: Oliver Wu
? author's email: oliver.wu@autodesk.com
? author's url: www.autodesk.com
? Which license do you want to use? MIT
   create package.json
   create .gitignore
   create .gitattributes
   create index.js
   create LICENSE
npm init done!
```

1. Would you like to enable git?
   If `no`, the git and its related configurations are not generated. git is only initiated once.

1. Would you like to enable the main entry point?
   If `no`, there is no `main` entry point in `package.json`.

1. Which license do you want to use?
   Choose any license or use sub generater, `adsk-license`, to generate the specific license.

## Getting To Know sub generators

### git-remote

It adds the remote url (origin) to the `.git/config` if the `[remote "origin"]` doesn't exist. It relies on `generator-git-init` generator and is triggered by `walle-node`.

> `yo walle-node:git-remote`

### npm-init

It acts as `npm init` and is triggered by `walle-node`.

> `yo walle-node:npm-init`

It also support the option to specify the prompts.

> `yo walle-node:npm-init --pkgConfig "{\"version\": \"1.0.0\"}"`

### commander

Commander scripts, see https://github.com/tj/commander.js

> `yo walle-node:commander`

> `Usage: node scripts <command> [<options>] [--] [<args>]`

Each commander has its own folder named as the commander name, such as `build`, `clean`, etc.

The commander executes the specific logic defined in `executor.js` which locates at the same folder with `index.js`. For example, the webpack generator generates the build logic in `executor.js` and copy it to the target project. That build logic is used when building the project.

The configuration is combined by mulitple sources and is leveraged by all `executors`.

### webpack

The webpack configuration generator.

> `yo walle-node:webpack --skip-install`

## License

MIT © [Oliver Wu](https://github.com/spywo)


[npm-image]: https://badge.fury.io/js/generator-walle-node.svg
[npm-url]: https://npmjs.org/package/generator-walle-node
[travis-image]: https://travis-ci.org/spywo/generator-walle-node.svg?branch=master
[travis-url]: https://travis-ci.org/spywo/generator-walle-node
[daviddm-image]: https://david-dm.org/spywo/generator-walle-node.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/spywo/generator-walle-node
[coveralls-image]: https://coveralls.io/repos/spywo/generator-walle-node/badge.svg
[coveralls-url]: https://coveralls.io/r/spywo/generator-walle-node
