var accountController = require('./controllers/account');
var indexController = require('./controllers/index');

module.exports = function(app) {
  app.get('/', indexController.index);
  app.get('/signup', accountController.getSignup);
}
