# krimzen-ninja-express-error-handling

[![Greenkeeper badge](https://badges.greenkeeper.io/KrimzenNinja/krimzen-ninja-express-error-handling.svg)](https://greenkeeper.io/)

![NPM](https://nodei.co/npm/krimzen-ninja-express-error-handling.png)

![CircleCi](https://circleci.com/gh/KrimZenNinja/krimzen-ninja-express-error-handling.svg?style=shield)
![Known Vulnerabilities](https://snyk.io/test/npm/krimzen-ninja-express-error-handling/badge.svg)
[![codecov](https://codecov.io/gh/KrimZenNinja/krimzen-ninja-express-error-handling/branch/master/graph/badge.svg)](https://codecov.io/gh/KrimZenNinja/krimzen-ninja-express-error-handling)

Uses boom to handle errors in express

## Install

    $ npm install --save krimzen-ninja-express-error-handling

## Usage

```js
import myModule from 'krimzen-ninja-express-error-handling'

myModule()
//TODO
```

## API

[See details](https://github.com/KrimZenNinja/krimzen-ninja-express-error-handling/blob/master/API.md)

## License

MIT © [Ryan Kotzen](https://github.com/KrimZenNinja)

## Contributing to this module

Install [Chandler](https://github.com/mattbrictson/chandler) to sync your `CHANGELOG.md` entries to GitHub

### How to publish to NPM

You can either do releases from the master branch or follow the LTS model and branch off when you do a release.

1. Ensure you are on the branch you want to publish from.
1. Decide based on what is going into the release how the version number is going to change, see [Semantic Versioning](http://semver.org/) for more info.
1. The `CHANGELOG.md` file should have pending changes documented in the `Unreleased` section, create a new heading for this version and cut the relevant changes and paste them into the new section.
1. Commit the changes to the `CHANGELOG.md` file.
1. Run one of the prebuilt publish commands that matches your `semver` `patch`, `minor`, `major`
	> `npm run patch -m "A message that makes sense"`
	If none of the prebuilt ones fit, you can use `npm version [major | minor | patch | premajor | preminor | prepatch | prerelease] -m "A message that makes sense"`
1. If you didn't publish from master, make sure to merge back into master if you were fixing a bug or the changes released need to go back to master.

### Snyk dependency checking

You can either add your project via the [web dashboard](https://snyk.io/) or via the cli by installing the lib `npm i -g snyk` and then running the setup `snyk wizzard`.
