/**
 * GET /
 * Contact page.
 */

exports.getContact = function(req, res) {
  res.render('contact', { title: 'Contact Us' });
};
