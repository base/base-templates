'use strict';

var option = require('base-option');
var plugins = require('base-plugins');
var generators = require('base-generators');
var templates = require('./');
var Base = require('base');

var app = new Base({isApp: true});
app.use(plugins());
app.use(option());
app.use(templates({foo: 'bar'}));
app.use(generators());

app.engine('hbs', require('engine-handlebars'));
app.create('pages');

app.register('one', function(one) {
  this.engine('hbs', require('engine-handlebars'));
  this.create('pages');

  this.task('foo', function(cb) {
    console.log('task > ', this.name);

    one.page('foo.hbs', {content: 'this is {{title}}'})
      .render({title: 'FOOO!'}, function(err, res) {
        if (err) throw err;
        console.log(res.content);
        cb();
      });
  });
});

app.task('foo', function(cb) {
  console.log('task > ', this.name);

  app.page('foo.hbs', {content: 'this is {{title}}'})
    .render({title: 'FOOO!'}, function(err, res) {
      if (err) throw err;
      console.log(res.content);
      cb();
    });
});

app.build('foo', function(err) {
  if (err) return console.log(err);
  console.log(app.options);
});

app.generate('one:foo', function(err) {
  if (err) return console.log(err);
  console.log(app.options);
  console.log('done');
});

