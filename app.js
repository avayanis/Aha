
/**
 * Module dependencies.
 */

var express = require('express');
var load = require('express-load');
var config = require('config');
var http = require('http');
var path = require('path');
var cons = require('consolidate');

var app = express();

// all environments
app.engine('hbs', cons.handlebars);
app.set('port', process.env.PORT || config.http.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: false });

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {

  // Setup Error Handler
  app.use(express.errorHandler());
}

load('controllers')
.then('routes')
.into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
