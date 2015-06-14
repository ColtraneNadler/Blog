/*

Created by Coltrane Nadler

Things to do:
	- [DONE] Sort articles from newest to oldest, right now its sorted oldest to newest.
	- Sort articles from newest to oldest on categories page
	- Make about page
	- Add ability to edit / remove posts if logged in.
	- [DONE] Add more pages (next + previous tabs at the page bottom), so only 5 posts per page
	- [DONE] Add older/new post buttons
	- Make 404 Page look sexier


*/

var express = require('express'),
	app = express(),
	path = require('path'),
	passport = require('./controllers/pass.js');

var bodyParser = require('body-parser');
var morgan = require('morgan'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');
var articles = require('./controllers/articles');
var conf = require('./config/auth'); 

app.use(express.static(__dirname + '/assets'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	secret: 'node learn',
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var notImplemented = function(req, res) {
	res.sendStatus(501);
};


//database init
var client = require('mongodb').MongoClient;

(function() { client.connect(conf.db, function(err, db) {
		if(err) return console.log(err);
		console.log('Connected to MongoDB.');
		global.col = db.collection('posts');
	});
}());

	app.get('/articles', articles.home);
	app.get('/', function(req, res) {
		res.redirect('/articles')
	})
	app.post('/articles', articles.create);
	app.get('/articles/new', function(req, res) {
    if(req.session.passport.user === undefined) {
    	res.redirect('/login');
    }
		res.render('pages/new.ejs');
	});
	app.get('/articles/:articleID', articles.id);
	app.get('/articles/prev/:num', articles.list)
	app.get('/articles/categorie/:categorie', articles.categorie)
	app.put('/articles/:articleID', notImplemented);
	app.delete('/articles/:articleID', notImplemented);
	app.get('/about', function(res, res) {
		res.render('pages/about.ejs')
	});
	app.get('/login', function(req, res) {
		res.render('pages/login.ejs');
	});
	app.post('/login', passport.authenticate('local', {
		failuserRedirect: '/login',
		successRedirect: '/',
	}));
	app.get('*', function(req, res) {
		res.render('pages/error.ejs');
	});


app.listen(3000, function() {
	console.log('Server running.')
})