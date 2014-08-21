/**
 * GET /
 * Home page.
 */

exports.getHome = function(req, res) {
  res.render('index', { title: 'Home' });
};
