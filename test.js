'use strict';

require('mocha');
var assert = require('assert');
var templates = require('./');
var Base = require('base');
var app;

describe('base-templates', function() {
  beforeEach(function() {
    app = new Base();
    app.use(templates());
  });
  
  it('should export a function', function() {
    assert.equal(typeof templates, 'function');
  });

  it('should export an object', function() {
    assert(templates);
    assert.equal(typeof templates, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      templates();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
