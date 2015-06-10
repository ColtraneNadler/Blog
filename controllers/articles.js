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
	console.log(req.body)
	blogPost.author = req.session.passport.user.name.username;
	//console.log(blogPost);
	//blogPost.tags = blogPost.tags.split(', ');
	//console.log(blogPost.tags[2]);
	//var description = blogPost.body.split(' ');
	//var desc = description.slice(0, 10);
	//blogPost.desc = desc.join(' ');
	blogPost.timestamp = Date.now();
	blogPost.id = randomString(6);

	console.log(blogPost);
	col.insert(blogPost, function(err, docs) {
		if(err) return console.log(err);
		console.log('Posted.');
	})

	res.redirect('/articles')

};


module.exports.home = function(req, res) {

	col.find().toArray(function(err, blogPosts) {
		if(err) return console.log(err);
		global.fullPosts = blogPosts.reverse();
		var posts = blogPosts.slice(0, 5);
		console.log(blogPosts.length)

			if(req.session.passport.user !== undefined) { 
				res.locals = {posts: posts, num: 1, user: req.session.passport.user.name.username};
				console.log(req.session.passport.user)
			} else {
				res.locals = {posts: posts, num: 1, user: undefined};
				console.log(req.session.passport.user)
			}

		//res.locals = {posts: posts, num: 1};
		res.render('pages/articles.ejs');
	});

};


module.exports.list = function(req, res) {
	var num = parseInt(req.params.num);
	if(num === 1) {
		res.redirect('/articles'); 
	} else {

		var max = num * 5, min = max - 5;
		if(fullPosts.length > min) {
		var posts = fullPosts.slice(min, max);
		console.log(posts.length);
		if(posts.length > 0) {
			res.locals = {posts: posts, num: num};
			res.render('pages/articles.ejs');
		} else {
			res.render('pages/error.ejs')
		}
	} else {
		res.render('pages/error.ejs')
	}
};
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
			res.render('pages/error.ejs')
		}
	});
};

module.exports.categorie = function(req, res) {
	var cat = req.params.categorie;
	console.log(cat)
	col.find({"categorie": cat}).toArray(function(err, blogPosts) {
		if(err) return console.log(err);
			//res.locals = {posts: blogPosts};
			res.locals = {posts: blogPosts, categorie: cat};
			res.render('pages/categorie.ejs')

	});
};
