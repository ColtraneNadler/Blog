var express = require('express'),
	app = express();
	path = require('path');

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


//database init
var client = require('mongodb').MongoClient;

(function() { client.connect('mongodb://admin:admin@ds031952.mongolab.com:31952/blog', function(err, db) {
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

	app.get('/articles/new', function(req, res) {
		res.render('pages/new.ejs');
	});


	app.get('/articles/:articleID', articles.id);

	app.put('/articles/:articleID', notImplemented);
	app.delete('/articles/:articleID', notImplemented);

	app.get('*', function(req, res) {
		res.redirect('/articles');
	})




var posts = [];



app.listen(3000, function() {
	console.log('Server running.')
})