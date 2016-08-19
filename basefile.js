'use strict';

var templates = require('./');

module.exports = function(app) {
  app.use(templates());

  app.task('default', function(cb) {
    app.engine('hbs', require('engine-handlebars'));
    app.create('pages');

    app.page('foo.hbs', {content: 'this is {{title}}'})
      .render({title: 'FOOO!'}, function(err, res) {
        if (err) throw err;
        console.log(res.content);
        cb();
      });
  });
};
