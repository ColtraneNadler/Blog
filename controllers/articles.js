var articles = [];;

module.exports.create = function(req, res) {
	articles.push(req.body)
	console.log('Posted: ' + JSON.stringify(req.body));
	res.redirect('/articles')
};


module.exports.list = function(req, res) {
	res.locals = {posts: articles};
	res.render('articles.ejs');
};