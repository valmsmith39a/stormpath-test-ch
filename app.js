var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var stormpath = require('express-stormpath');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


//app.use(stormpath.init(app, { website:true }));

/*
app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: 'ID',
      secret: 'SECRET',
    }
  },
  application: {
    href: 'HREF'
  },
  website: true
}));
*/

//app.use('/', stormpath.loginRequired, routes);
//app.use('/users', stormpath.loginRequired, users);


/*
app.use('/', stormpath.loginRequired(req, res, next) => {
  if(req.user) {
    res.send(req.user.givenName + 'You are now logged in');
  } else {
    res.send('Please log in.');
  }
});
*/

/*
app.use(stormpath.init(app, {
  website:true
}));

app.use('/', stormpath.loginRequired(req, res, next) => {
  if(req.user) {
    res.send(req.user.givenName + 'You are now logged in');
  } else {
    res.send('Please log in.');
  }
});
*/

/*
app.run(function($stormpath) {
  $stormpath.uiRouter({
    loginState:'login',
    defaultPostLoginState:'home'
  });
});

app.use(stormpath.init(app, {
  website:true
}));

app.use('/', stormpath.loginRequired(req, res, next) => {
  if(req.user) {
    res.send(req.user.givenName + 'You are now logged in');
  } else {
    res.send('Please log in.');
  }
});

app.on('stormpath.ready', () => {
  app.listen(process.env.PORT || 3000);
});
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
