'use strict';

var opts = {alias: {pattern: 'p'}};
var argv = require('yargs-parser')(process.argv.slice(2), opts);
var runner = require('base-test-runner')(argv);
var suite = require('base-test-suite');
var Base = require('base');
var templates = require('./');

function App(options) {
  if (!(this instanceof App)) {
    return new App(options);
  }
  Base.call(this, null, options);
  this.isApp = true;
  this.use(templates());
}

Base.extend(App);
templates.Templates.extend(App);

/**
 * Run the tests in `base-test-suite`
 */

runner.on('templates', function(file) {
  require(file.path)(App);
});

runner.addFiles('templates', suite.test.templates);
