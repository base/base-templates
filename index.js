/*!
 * base-templates <https://github.com/node-base/base-templates>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var utils = require('./utils');

module.exports = function(config, fn) {
  if (typeof config === 'function') {
    fn = config;
    config = {};
  }

  return function plugin(app) {
    if (!isValidInstance(this, fn)) return;
    var Templates = utils.Templates;

    // original constructor reference
    var Ctor = this.constructor;
    var opts = this.options = utils.merge({}, config, this.options);

    Templates.extend(Ctor);
    Templates.bubble(Ctor);
    Templates.call(this, opts);
    Templates.debug(this);

    // restore original constructor
    utils.define(this, 'constructor', Ctor);
    return plugin;
  };
};

function isValidInstance(app, fn) {
  if (app.isTemplates || app.isRegistered('base-templates')) {
    return false;
  }
  if (app.isViews || app.isCollection || app.isGroup || app.isList) {
    return false;
  }
  if (app.isView || app.isItem) {
    return false;
  }
  fn = fn || app.options.validatePlugin;
  if (typeof fn === 'function' && !fn(app)) {
    return false;
  }
  return true;
}
