
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,	cors = require('cors')
  , calculator = require('./routes/calculator');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//Enable CORS
app.use(cors());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', calculator.home);

app.post('/add', cors(), calculator.add);
app.post('/subtract', cors(),calculator.subtract);
app.post('/multiply',cors(), calculator.multiply);
app.post('/divide', cors(),calculator.divide);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
