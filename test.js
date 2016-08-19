'use strict';

var opts = {alias: {pattern: 'p'}};
var argv = require('yargs-parser')(process.argv.slice(2), opts);
var runner = require('base-test-runner')(argv);
var suite = require('base-test-suite');
var Base = require('base');
var templates = require('./');
var app = new Base({isApp: true});
app.use(templates());

console.log(app.views)

/**
 * Run the tests in `base-test-suite`
 */

// runner.on('templates', function(file) {
//   require(file.path)(app);
// });

// runner.addFiles('templates', suite.test.templates);
