var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var VKUser = mongoose.model('VKUser');
module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/user', function(req, res){
		if (req.user) {
			VKUser.findOne({profileUrl: req.user.profileUrl}, function(err, vkuser) {
				res.send({state: 'success', user: vkuser});
			});
		}
		else {
			res.send({state: 'success', user: null});
		}
		// res.send({state: 'success', user: req.user ? req.user : null});
		// console.log(req.user);
		
	});

	// //sends failure login state back to angular
	// router.get('/failure', function(req, res){
	// 	res.send({state: 'failure', user: null, message: "Invalid username or password"});
	// });

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/admin',
		failureRedirect: '/admin-login'
	}));

	

	//log out
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/vk',
        passport.authenticate('vk', {
            scope: ['friends']
        }),
        function (req, res) {
         // The request will be redirected to vk.com 
         // for authentication, so
         // this function will not be called.
        });
 
    router.get('/vk/callback',
        passport.authenticate('vk', {
            failureRedirect: '/'
        }),
        function (req, res) {
            // Successful authentication
            //, redirect home.
            res.redirect('/');
        });



	return router;

}