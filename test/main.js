var gulp   = require('gulp');
var assert = require('stream-assert');
var should = require('should');
var wt     = require('../');

var path = require('path');
var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); }

describe('gulp-webtask', function() {
  describe('create()', function() {
    it('should throw, when token argument is missing', function () {
      (function() {
        wt.create();
      }).should.throw('Missing token option for gulp-webtask');
    });

    it('should throw, when name argument is missing', function () {
      (function() {
        wt.create({token: Date()});
      }).should.throw('Missing name option for gulp-webtask');
    });

    it('should throw, when token is invalid', function (done) {
      gulp.src(fixtures('*'))
        .pipe(wt.create({ token: Date(), name: Date() }))
        .on('error', function (err) {
          err.message.should.match(/Unable to decode token/);
          done();
        });
    });

    it('should emit error on streamed file', function (done) {
      gulp.src(fixtures('*'), { buffer: false })
        .pipe(wt.create({ token: Date(), name: Date() }))
        .on('error', function (err) {
          err.message.should.eql('Streaming not supported');
          done();
        });
    });
  });
});
