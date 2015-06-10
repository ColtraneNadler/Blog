var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	auth = require('./../config/auth');

passport.use(new LocalStrategy(
	function(username, password, done) {
		if(username === auth.username && password === auth.passwordå) {
			return done(null, {username: 'admin'})
		}

		return done(null, false);
	}
));

passport.serializeUser(function(user, done) {
	done(null, {name: user});
});

passport.deserializeUser(function(user, done) {
	done(null, {name: user});
});

module.exports = passport;