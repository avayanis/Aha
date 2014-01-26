exports.index = function(request, response, next) {
  
  var service = request.route.params.service;

  response.send(service);
};