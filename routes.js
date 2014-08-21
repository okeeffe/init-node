var indexController = require('./controllers/index');
var contactController = require('./controllers/contact');
var accountController = require('./controllers/account');

module.exports = function(app) {
  //Index controller
  app.get('/', indexController.getHome);

  //Contact controller
  app.get('/contact', contactController.getContact)

  //Account controller
  app.get('/signup', accountController.getSignup);
}
