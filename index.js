/*!
 * base-templates <https://github.com/node-base/base-templates>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var utils = require('./utils');

module.exports = function templates(config, fn) {
  if (typeof config === 'function') {
    fn = config;
    config = {};
  }

  return function plugin(app) {
    if (!utils.isValid(app, 'base-templates')) return;
    var Templates = utils.Templates;

    // original constructor reference
    var Ctor = this.constructor;
    var self = this;
    function App() {
      Ctor.apply(this, arguments);
      console.log(this)
    }

    Templates.call(this, utils.merge(this.options, config));
    this.visit('define', Templates.prototype);
    Templates.extend(App);
    Templates.bubble(App);

    // restore original constructor
    utils.define(this, 'constructor', App);
    return plugin;
  };
};
