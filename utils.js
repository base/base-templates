'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-option', 'option');
require('base-plugins', 'plugins');
require('is-plain-object');
require('is-valid-app', 'isValid');
require('templates', 'Templates');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
