module.exports = function(app) {

  var controller = app.controllers.discover;

  app.get('/discover/:service', controller.index);
};