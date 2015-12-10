# gulp-webtask

[![Build Status](https://travis-ci.org/jcenturion/gulp-webtask.png)](https://travis-ci.org/jcenturion/gulp-webtask)

[Gulp](http://gulpjs.com/) plugin to help you with [Webtask](https://webtask.io/) development.

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-webtask`

## Usage

Define a deploy task in your gulpfile.js (as below) which can be used to create or update a webtask.

#### Configuring a single webtask

```javascript
var gulp = require('gulp');
var wt   = require('gulp-webtask');

gulp.task('deploy', function () {
  return gulp.src('./task.js')
    .pipe(wt.create({
      token: process.env('YOUR-WEBTASK-TOKEN'),
      name: 'task'
    }));
});
```

#### Configuring a multiple webtasks

```javascript
var gulp = require('gulp');
var wt   = require('gulp-webtask');

gulp.task('deploy', function () {
  return gulp.src('./webtasks/*.js')
    .pipe(wt.create({
      token: process.env('YOUR-WEBTASK-TOKEN'),
      name: ['task1', 'task2']
    }));
});
```
NOTE: It there is no name defined for task it will be skipped.

Now, you should be able to call your task by doing:

```
gulp deploy
```

### Options

#### options.token

Type: `String`  
Default: `null`

Your webtask token. For more information about how to get your token check [Webtask.io](https://webtask.io/) or [wt-cli](https://github.com/auth0/wt-cli).

#### options.name

Type: `String` or `Array`
Default: `null`

The name for your webtask or a collection of names for multiple creation.

#### options.secrets

Type: `Object`  
Default: `{}`

A collection of secret parameters. For more information check [Passing Secrets to Webtask Code](https://webtask.io/docs/issue_parameters).

#### options.params

Type: `Object`  
Default: `{}`

A collection of parameters.

## Roadmap

- Add support for Log streaming

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository [issues section](https://github.com/jcenturion/gulp-webtask/issues).

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
