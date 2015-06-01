/*

Created by Coltrane Nadler

Things to do:
	- Sort articles from newest to oldest, right now its sorted oldest to newest.
	- Make about page

*/

var express = require('express'),
	app = express();
	path = require('path');
	basicAuth = require('basic-auth')

var bodyParser = require('body-parser');
var morgan = require('morgan');
var articles = require('./controllers/articles');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var notImplemented = function(req, res) {
	res.sendStatus(501);
};

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'admin' && user.pass === 'admin') {
    return next();
  } else {
    return unauthorized(res);
  };
};

//database init
var client = require('mongodb').MongoClient;

(function() { client.connect('mongodb://***/blog', function(err, db) {
		if(err) return console.log(err);
		console.log('Connected to MongoDB.');
		global.col = db.collection('posts');
	});
}());

	app.get('/articles', articles.list);

	app.get('/', function(req, res) {
		res.redirect('/articles')
	})


	app.post('/articles', articles.create);

	app.get('/articles/new', auth, function(req, res) {
		res.render('pages/new.ejs');
	});


	app.get('/articles/:articleID', articles.id);

	app.get('/articles/categorie/:categorie', articles.categorie)

	app.put('/articles/:articleID', notImplemented);
	app.delete('/articles/:articleID', notImplemented);

	app.get('*', function(req, res) {
		res.redirect('/articles');
	})




var posts = [];



app.listen(3000, function() {
	console.log('Server running.')
})