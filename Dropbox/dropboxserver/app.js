
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  ,	cors = require('cors')
  , bodyParser = require('body-parser')
  , user = require('./routes/user/user')
  , files = require('./routes/files/listdir')
  , fileupload = require('./routes/files/upload');

var app = express();


//Enable CORS
app.use(cors());

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


app.post('/signup', cors(), user.signup);
app.post('/signin', cors(), user.signin);

app.post('/listdir',cors(), files.listdir);
app.post('/fileupload',cors(), fileupload.uploadfile);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
