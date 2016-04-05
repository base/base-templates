'use strict';

var templates = require('./');
var Base = require('base');

// function App() {
//   Base.call(this);
//   this.is('app');
//   this.use(templates());
// }
// Base.extend(App);

// var app = new App();
var app = new Base();
app.is('app');
app.use(templates());

app.engine('hbs', require('engine-handlebars'));
app.create('pages');

app.page('foo.hbs', {content: 'this is {{title}}'})
  .render({title: 'FOOO!'}, function(err, res) {
    if (err) throw err;
    console.log(res.content);
  });
