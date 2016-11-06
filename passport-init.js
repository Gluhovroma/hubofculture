var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var AuthVKStrategy = require('passport-vkontakte').Strategy;
var VKUser = mongoose.model('VKUser');
module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		
		done(null, JSON.stringify(user));
	});

	passport.deserializeUser(function(data, done) {
		// User.findById(data, function(err, user) {			
		// 	done(err, user);
		// });
		 try {
	        done(null, JSON.parse(data));
	    } catch (e) {
	        done(err)
	    }
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 
			// check in mongo if a user with username exists or not
			User.findOne({ 'username' :  username }, 
				function(err, user) {
					// In case of any error, return using the done method
					if (err)
						return done(err);
					// Username does not exist, log the error and redirect back
					if (!user){
						
						return done(null, false);                 
					}
					// User exists but wrong password, log the error 
					if (!isValidPassword(user, password)){
						console.log('Invalid Password');
						return done(null, false); // redirect back to login page
					}
					// User and password both match, return user from done method
					// which will be treated like success
					return done(null, user);
				}
			);
		}
	));


	passport.use('vk', new AuthVKStrategy({
        clientID: "5198517",
        clientSecret: "qNz4iR4yoRf1CPK8gP37",
        callbackURL: "http://hubofculture.com/auth/vk/callback"
    },
    function (accessToken, refreshToken, profile, done) {
 
    
 		VKUser.findOne({'profileUrl' :  profile.profileUrl }, function(err, vkuser) {
 				
				// In case of any error, return using the done method
				if (err){					
					return done(err);
				}
				// already exists
				if (vkuser) {
					return done(null, vkuser);
				} else {					
					var newVKUser = new VKUser();
					newVKUser.username = profile.displayName;
					newVKUser.photoUrl = profile.photos[0].value;
					newVKUser.profileUrl = profile.profileUrl;		
					newVKUser.like_tracks = {};			
					newVKUser.save(function(err, user) {
						if (err){
							console.log('Error in Saving user: '+err);  
							throw err;  
						}						    
						return done(null, {
				          	username: profile.displayName,
				            photoUrl: profile.photos[0].value,
				            profileUrl: profile.profileUrl
			        	});
					});
				}
			});
        
    }
));
	// passport.use('signup', new LocalStrategy({
	// 		passReqToCallback : true // allows us to pass back the entire request to the callback
	// 	},
	// 	function(req, username, password, done) {

	// 		// find a user in mongo with provided username
	// 		User.findOne({ 'username' :  username }, function(err, user) {
	// 			// In case of any error, return using the done method
	// 			if (err){
	// 				console.log('Error in SignUp: '+err);
	// 				return done(err);
	// 			}
	// 			// already exists
	// 			if (user) {
	// 				console.log('User already exists with username: '+username);
	// 				return done(null, false);
	// 			} else {
	// 				// if there is no user, create the user
	// 				var newUser = new User();

	// 				// set the user's local credentials
	// 				newUser.username = username;
	// 				newUser.password = createHash(password);

	// 				// save the user
	// 				newUser.save(function(err) {
	// 					if (err){
	// 						console.log('Error in Saving user: '+err);  
	// 						throw err;  
	// 					}
	// 					console.log(newUser.username + ' Registration succesful');    
	// 					return done(null, newUser);
	// 				});
	// 			}
	// 		});
	// 	})
	// );
	
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
