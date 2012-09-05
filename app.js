var express = require('express')
  , fs   = require('fs')
  , path = require('path');

var app = express();
var db  = require('dirty')('bookmarks.db');

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/public')));
});


// Bootstrap controllers
var controllers_path = __dirname + '/app/controllers'
  , controller_files = fs.readdirSync(controllers_path);
controller_files.forEach(function (file) {
  require(controllers_path+'/'+file)(app, db);
});


app.listen(app.get('port'))