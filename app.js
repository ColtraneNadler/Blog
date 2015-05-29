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

var posts = [];

var notImplemented = function(req, res) {
	res.sendStatus(501);
};

app.get('/articles', articles.list);
app.get('/articles/new', function(req, res) {
	res.sendFile(__dirname + '/new.html');
});
app.get('/articles/:articleID', notImplemented);
app.post('/articles', articles.create);
app.put('/articles/:articleID', notImplemented);
app.delete('/articles/:articleID', notImplemented);


app.listen(3000, function() {
	console.log('Server running.')
})