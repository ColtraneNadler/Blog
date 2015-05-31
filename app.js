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


//ID Generator
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


//database init
var client = require('mongodb').MongoClient;

client.connect('mongodb://admin:admin@ds031952.mongolab.com:31952/blog', function(err, db) {
	if(err) return console.log(err);
	console.log('Connected')

	var col = db.collection('posts');

	app.get('/articles', function(req, res) {
		var articles = [];

		col.find().toArray(function(err, blogPosts) {
			if(err) return console.log(err);
			articles = blogPosts;
			console.log(articles);
		
			res.locals = {posts: articles};
			res.render('pages/articles.ejs');
		})

	});

	app.get('/', function(req, res) {
		res.redirect('/articles')
	})


	app.post('/articles', function(req, res) {
		var blogPost = req.body;
		console.log(blogPost);
		blogPost.timestamp = Date.now();
		blogPost.id = randomString(6);

		col.insert(blogPost, function(err, docs) {
			if(err) return console.log(err);
			console.log('Posted: ' + docs);
		})

		res.redirect('/articles')

	});

	app.get('/articles/new', function(req, res) {
		res.render('pages/new.ejs');
	});


	app.get('/articles/:articleID', function(req, res) {
		var ID = req.params.articleID;
		col.findOne({id: ID}, function(err, doc) {
			if(err) return console.log;
			if(doc) {
				console.log(doc)
				res.locals = {post: doc};
				res.render('pages/article.ejs');
			} else {
				res.redirect('/articles');
			}
		})
	});

	app.put('/articles/:articleID', notImplemented);
	app.delete('/articles/:articleID', notImplemented);

	app.get('*', function(req, res) {
		res.redirect('/articles');
	})

})



var posts = [];



app.listen(3000, function() {
	console.log('Server running.')
})