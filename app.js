var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movies = require('./routes/movies');
var books = require('./routes/books');
const weather = require('./routes/weather');

const ee = require('@google/earthengine');
const privateKey = require('../../../userEyz/zzazza-project-99c173e8d11f');
const service_account = 'deveyz90@zzazza-project.iam.gserviceaccount.com';

const PORT = process.env.PORT || 8084;




/*
const credentials = ee.ServiceAccountCredentials(service_account, privateKey);
ee.Initialize(credentials);

// Initialize client library and run analysis.
var initialize = function() {
    ee.initialize(null, null, function() {
        // ... run analysis ...
    }, function(e) {
        console.error('Initialization error: ' + e);
    });
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, initialize, function(e) {
    console.error('Authentication error: ' + e);
});
*/
/*
// Run an Earth Engine script.
var image = new ee.Image('srtm90_v4');
image.getMap({min: 0, max: 1000}, function(map) {
    console.log(map);
});
*/
var app = express();

app.use(require('connect-history-api-fallback')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies', movies);
app.use('/api/books', books);
app.use('/api/weather', weather);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

ee.data.authenticateViaPrivateKey(privateKey, () => {
    ee.initialize(null, null, ()=> {
        app.listen(8084);
        console.log(`Listening on port ${PORT}`)
    });

});

module.exports = app;
