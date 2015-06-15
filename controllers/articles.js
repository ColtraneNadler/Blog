//ID Generator
var marked = require('marked');


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
	blogPost.raw = blogPost.body;
	blogPost.body = marked(blogPost.body);
	blogPost.author = req.session.passport.user.name.username;
	console.log('Marked: ' + blogPost.body)
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

module.exports.editCreate = function(req, res) {
	console.log('Posted, checking')
	var blogPost = req.body;
	blogPost.id = req.params.id;
	blogPost.raw = blogPost.body;
	blogPost.body = marked(blogPost.body);
	console.log(blogPost);
	col.update({id: blogPost.id}, {$set: {body: blogPost.body, raw: blogPost.raw}}, function(err, docs) {
		if(err) return console.log(err);
		console.log('Updated')
	})
	
	res.redirect('/articles')

}

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
			res.locals = {post: doc, user: req.session.passport.user};
			res.render('pages/article.ejs');
		} else {
			res.render('pages/error.ejs')
		}
	});
};

module.exports.edit = function(req, res) {
    if(req.session.passport.user === undefined) {
    	res.render('pages/error.ejs');
    }

	var ID = req.params.articleID;
	col.findOne({id: ID}, function(err, doc) {
		if(err) return console.log;
		if(doc) {
			console.log(doc)
			res.locals = {post: doc};
			res.render('pages/edit.ejs');
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

module.exports.remove = function(req, res) {
    if(req.session.passport.user === undefined) {
    	res.render('pages/error.ejs');
    	res.end();
    }

	var id = req.params.id;
	col.remove({id: id}, function(err, doc) {
		if(err) return console.log(err);
		console.log('Delted id: ' + id)
	})
	res.redirect('/articles')
}
