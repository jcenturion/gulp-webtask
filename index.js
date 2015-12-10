var gutil       = require('gulp-util');
var through     = require('through2');
var PluginError = gutil.PluginError;
var Sandbox     = require('sandboxjs');
var colors      = require('colors/safe');
var path        = require('path');

var PLUGIN_NAME = 'gulp-webtask';

module.exports = {
  create: function create (opt) {
    var count = 0;

    opt = opt || {};

    if (!opt.token) {
      throw new PluginError(PLUGIN_NAME, 'Missing token option for ' + PLUGIN_NAME);
    }

    if (!opt.name) {
      throw new PluginError(PLUGIN_NAME, 'Missing name option for ' + PLUGIN_NAME);
    }

    function bufferContents(file, enc, cb) {
      count++;

      if ((count>1 && !Array.isArray(opt.name)) || (Array.isArray(opt.name) && !opt.name[count-1])) {
        console.log(colors.white(' => ') +
          colors.green(PLUGIN_NAME + ' is skipping ') +
          colors.yellow(path.basename(file.path)) +
          colors.green(' because a webtask name was not provided'));
        cb();
        return;
      }

      if (file.isNull()) {
        cb();
        return;
      }

      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME,  'Streaming not supported'));
        cb();
        return;
      }

      try {
        var wt     = Sandbox.fromToken(opt.token);
        var wtName = Array.isArray(opt.name) ? opt.name[count-1] : opt.name;

        wt.create(file.contents.toString(), {
          name:    wtName,
          secrets: opt.secret || {},
          params:  opt.param || {},
          parse:   opt.parse,
          merge:   opt.merge
        })
        .then(function (webtask) {
          console.log(colors.white(' => ') +
            colors.green('webtask successfully deployed to: ') +
            colors.yellow(webtask.url));
          cb();
        })
        .catch(function (error) {
          this.emit('error', new PluginError(PLUGIN_NAME, error));
        });
      } catch(error) {
        this.emit('error', new PluginError(PLUGIN_NAME, error));
      }
    }

    function endStream(cb) {
      cb();
    }

    return through.obj(bufferContents, endStream);
  }
};
