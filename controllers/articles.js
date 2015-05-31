var articles = [];;

module.exports.create = function(req, res) {
	var blogPost = req.body;
	blogPost.timestamp = Date.now();
	col.insert(blogPost, function(err, doc) {
		if(err) return console.log(err);
		console.log('Posted: ' + blogPost)
	})
	res.redirect('/articles')
};


module.exports.list = function(req, res) {
	col.find().toArray(function(err, posts) {
		if(err) return console.log(err);
		articles = posts;
	})
	res.render('articles.ejs', {posts: articles});
};