var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post1212');
var Instagram = mongoose.model('Instagram1212');
var Timetable = mongoose.model('Timetable');
var Video = mongoose.model('Video1');
var Tag = mongoose.model('Tag');
var Ester = mongoose.model('Ester21212');
var SoundCloud = mongoose.model('SoundCloud');
var People = mongoose.model('People');
var Info = mongoose.model('Info');
var Song = mongoose.model('Song');
var Podcast = mongoose.model('Podcast');
var VKUser = mongoose.model('VKUser');
var People = mongoose.model('People');
var Author = mongoose.model('Author');
var Moviemaker = mongoose.model('Moviemaker');
var Creator = mongoose.model('Creator');
var Dj = mongoose.model('Dj');

router.route('/esters:tag?:offset?')
	
	.get(function(req, res){	


		if (req.query.tag == 'all') {
			
			Ester
				.find()
				.sort({created_at: 'desc'})
				.limit(8)
				.skip( 8 * req.query.offset)
				.populate('post')
				.populate('instagram')
				.populate('video')
				.populate('tags')	
				.populate('sound_cloud')				
				.exec(function (err, esters) {
					if(err){
						return res.send(500, err);
					}
							
					return res.send(200, esters);
				});
		}
		else {
			
			Tag
				.findOne({urlname: req.query.tag}, function (err, tag) {
  					if(err){
						return res.send(500, err);
					}
					if (tag){
						Ester
							.find({tags: tag._id})
							.sort({created_at: 'desc'})
							.limit(15)
							.skip( 15 * req.query.offset)
							.populate('post')
							.populate('instagram')
							.populate('video')
							.populate('tags')	
							.populate('sound_cloud')
							.exec(function (err, esters) {
								if(err){

									return res.send(500, err);
								}			
								console.log();						
								return res.send(200, esters);
							});
					}
					else {
						return res.send(200, null);
					}
					
				});				
		}
	});


router.route('/postinfo/:post?')
	.get(function(req, res){
	
		Post.findOne({urlname: req.query.post})
			.populate('tags')
			.exec(function(err, post){
				if(err)
					res.send(err);
				Post
					.find()
					.sort({created_at: 'desc'})
					.limit(3)
					.select('title author tags urlname annotation small_photo')
					.populate('tags')
					.exec(function (err, posts) {
						if(err){
							return res.send(500, err);
						}
						return res.send(200, {post:post, posts:posts});
				});
				
			});
	}); 

router.route('/peoples:offset?')
	
	.get(function(req, res) {
		console.log("я тут1");
			People
				.find()
				.sort({created_at: 'desc'})
				.limit(20)
				.skip( 20 * req.query.offset)								
				.exec(function (err, people) {
					if(err){
						return res.send(500, err);
					}
							
					return res.send(200, people);
				});	

	});


router.route('/peopleinfo:people?')
	.get(function(req, res){
		console.log("я тут2");
		console.log(req.query.people);
		People.findOne({urlname: req.query.people}, function(err, people){
				if(err)
					res.send(err);
				return res.send(200, people);
				
			});
	});


router.route('/timetable')
	
	//gets all posts
	.get(function(req, res){
		var date = new Date();
		var date_string = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();	
		Timetable
			.findOne({date_string: date_string})				
			.exec(function (err, timetable) {
				if(err){
					return res.send(500, err);
				}

				return res.send(200, timetable);
			});
	});

router.route('/alltimetable')
	
	//gets all posts
	.get(function(req, res){
		var date = new Date();
		var a = date.toDateString();
		var date2 = new Date(a);
		
		Timetable
			.find({date: {$gte : date2 }})
			.select('date date_string')				
			.exec(function (err, timetable) {
				if(err){
					return res.send(500, err);
				}							
				return res.send(200, timetable);
			});
	});


router.route('/timetable/:date')

	.get(function(req, res){
		Timetable
			.findOne({date_string: req.params.date})				
			.exec(function (err, timetable) {
				if(err){
					return res.send(500, err);
				}
							
				return res.send(200, timetable);
			});
	}) 

router.route('/tags')
	
	//gets all tags
	.get(function(req, res){
		
		Tag
			.find()
			.exec(function (err, tag) {
				if(err){
					return res.send(500, err);
				}			
				return res.send(200, tag);
			});
	});


router.route('/info')	
	
	.get(function(req, res){
		Info.findOne(function(err, info){
			if (err)
				res.send(500, err);
			res.send(200, info)
		})

	})
router.route('/author')	
	
	.get(function(req, res){
		Author.findOne(function(err, author){
			if (err)
				res.send(500, err);
			res.send(200, author)
		})

	})

router.route('/moviemaker')	
	
	.get(function(req, res){
		Moviemaker.findOne(function(err, moviemaker){
			if (err)
				res.send(500, err);
			res.send(200, moviemaker)
		})

	})
router.route('/dj')	
	
	.get(function(req, res){
		Dj.findOne(function(err, dj){
			if (err)
				res.send(500, err);
			res.send(200, dj)
		})

	})

router.route('/creator')	
	
	.get(function(req, res){
		Creator.findOne(function(err, creator){
			if (err)
				res.send(500, err);
			res.send(200, creator)
		})

	})

router.route('/songlike:song?')	
	.get(function(req, res){
		
		Song.findOne({id:req.query.song}, function(err, song){
			if (err)
				res.send(500, err);		
			if 	(req.user) {
				VKUser.findOne({profileUrl: req.user.profileUrl}, function(err, vkuser){
					if (err)
						res.send(500, err);	
					if (song) {
						if (!vkuser.like_tracks) {
							vkuser.like_tracks = {};
							vkuser.like_tracks[req.query.song]  = song;
						}
						else {
							var tracks = vkuser.like_tracks;
							vkuser.like_tracks = {};
							tracks[req.query.song] = song;
							vkuser.like_tracks = tracks;
						}		
					
						vkuser.save(function(err, user) {
							if (err)
								res.send(500, err);	
							console.log("save user tracks");
							console.log(user);						    
							res.send(200, user)             
						});		
					}
					else {
						res.send(200, vkuser)
					}	
					
				})
			}
			else {
				res.send(200, null);	
			}
			
		})

	})

router.route('/songunlike:song?')	
	.get(function(req, res){		
			
			if 	(req.user) {
				VKUser.findOne({profileUrl: req.user.profileUrl}, function(err, vkuser){
					if (err)
						res.send(500, err);		
					
					var tracks = vkuser.like_tracks;
					vkuser.like_tracks = {};
					delete tracks[req.query.song];
					vkuser.like_tracks = tracks
					vkuser.save(function(err, user) {
						if (err)
							res.send(500, err);	
						console.log("save user tracks");
						console.log(user);						    
						res.send(200, user)             
					});		
				})
			}
			else {
				res.send(200, null);	
			}
			
	

	})
router.route('/getPodcast:folder?')	
	.get(function(req, res) {	
		
		Podcast.find({folder: req.query.folder}, function(err, podcasts){
			if (err) {
				res.send(500, err);	
			}
			res.send(200, podcasts)  
		})

	})

router.route('/getSongs:podcasts?')	
	.get(function(req, res) {	
		
		Song.find({podcast: req.query.podcast}, function(err, songs){
			if (err) {
				res.send(500, err);	
			}
			res.send(200, songs)  
		})

	})

module.exports = router;