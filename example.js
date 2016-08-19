'use strict';

var templates = require('./');
var Base = require('base');

var app = new Base();
app.use(templates());

app.engine('hbs', require('engine-handlebars'));
app.create('pages');

app.page('foo.hbs', {content: 'this is {{title}}'})
  .render({title: 'FOOO!'}, function(err, res) {
    if (err) throw err;
    console.log(res.content);
  });
