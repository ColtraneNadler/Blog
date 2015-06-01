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


var client = require('mongodb').MongoClient;


//add description, only going to display descriptions on the articles page.
module.exports.create = function(req, res) {
	var blogPost = req.body;
	console.log(blogPost);
	//blogPost.tags = blogPost.tags.split(', ');
	//console.log(blogPost.tags[2]);
	blogPost.timestamp = Date.now();
	blogPost.id = randomString(6);

	col.insert(blogPost, function(err, docs) {
		if(err) return console.log(err);
		console.log('Posted: ' + docs);
	})

	res.redirect('/articles')

};


module.exports.list = function(req, res) {

	col.find().toArray(function(err, blogPosts) {
		if(err) return console.log(err);
		
		res.locals = {posts: blogPosts};
		res.render('pages/articles.ejs');
	});

};


module.exports.id = function(req, res) {
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
	});
};

module.exports.categorie = function(req, res) {
	var cat = req.params.categorie;
	console.log(cat)
	col.find({"categorie": cat}).toArray(function(err, blogPosts) {
		if(err) return console.log(err);
		//res.locals = {posts: blogPosts};
		res.send(blogPosts)

	});
};
