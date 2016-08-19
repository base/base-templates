/*!
 * base-templates <https://github.com/node-base/base-templates>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function(options) {
  return function fn(app) {
    if (!utils.isValid(app, 'base-templates')) return;
    var ctor = this.constructor;

    this.use(utils.plugins());
    this.use(utils.option());

    // inherit templates
    ctor.inherit(ctor, utils.Templates);
    this.define('isTemplates', true);

    // Object.assign(this, utils.Templates.prototype);
    for (var key in utils.Templates.prototype) {
      if (utils.Templates.prototype.hasOwnProperty(key)) {
        this.define(key, utils.Templates.prototype[key]);
      }
    }

    // initialize Templates defaults (loads plugins, etc)
    utils.Templates.prototype.initTemplates.call(this);

    // add options defined on this plugin
    if (utils.isPlainObject(options)) {
      this.option(options || {});
    }

    // return the plugin fn to ensure it gets
    // loaded onto child instances
    return fn;
  };
};

/**
 * Lazily expose `Templates`
 */

Object.defineProperty(module.exports, 'Templates', {
  get: function() {
    return utils.Templates;
  }
});
