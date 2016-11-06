var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var multer = require('multer');
var fs = require('fs');
var im = require('imagemagick');
var Post = mongoose.model('Post1212');
var Instagram = mongoose.model('Instagram1212');
var Timetable = mongoose.model('Timetable');
var Video = mongoose.model('Video1');
var Song = mongoose.model('Song');
var Tag = mongoose.model('Tag');
var Ester = mongoose.model('Ester21212');
var SoundCloud = mongoose.model('SoundCloud');
var People = mongoose.model('People');
var Author = mongoose.model('Author');
var Creator = mongoose.model('Creator');
var Dj = mongoose.model('Dj');
var Moviemaker = mongoose.model('Moviemaker');
var Info = mongoose.model('Info');
var id3 = require('id3js');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  		console.log("yes1");
  	if(file.fieldname == 'photo_file'){

  		cb(null, './public/img/')
  	}
  	if(file.fieldname == 'songs_files'){
  		cb(null, './public/sound/')
  	}    
  },
  filename: function (req, file, cb) { 
  		console.log("yes2");
  	if(file.fieldname == 'photo_file') {  		
  			cb(null, Date.now()+ '.jpg')
  				
  	}
  	if(file.fieldname == 'songs_files'){
  		cb(null, file.originalname + Date.now()+ '.mp3')
  	}    
  }
})


var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'photo_file', maxCount: 1 }, { name: 'songs_files', maxCount: 10 }]);
var peopleUpload = upload.single('photo_file');

function isAuthenticated (req, res, next) {	
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}
	return res.redirect('/login');
};

router.use('/post', isAuthenticated);
router.use('/people', isAuthenticated);
router.use('/timetable', isAuthenticated);
router.use('/instagram', isAuthenticated);
router.use('/soundcloud', isAuthenticated);
router.use('/video', isAuthenticated);
router.use('/tag', isAuthenticated);
router.use('/info', isAuthenticated);
router.use('/author', isAuthenticated);
router.use('/creator', isAuthenticated);
router.use('/dj', isAuthenticated);
router.use('/moviemaker', isAuthenticated);

router.route('/posts')	
		
	.post(cpUpload, function(req, res) {
		
		var save_post = function(post) {
			console.log(post);
			post.save(function(err, post) {
						if (err)
							return res.send(500, err);
						if (post.status == "publication") {				
							ester.save(function(err, ester) {
								if (err)
									return res.send(500, err);					
								return res.send(200, null);
							});
						}
						else 				
							return res.send(200, null);		
			});
		}


		var post = new Post();	
		
		post.title = req.body.title;
		post.author = req.body.author;
		post.annotation = req.body.annotation;
		post.content = req.body.content;
		if (req.body.tags != "") {
			post.tags = JSON.parse(req.body.tags);	
		}		
		post.urlname = req.body.urlname;	
		post.type = req.body.type;		
		post.photo = null;
		post.songs = null;
		post.status = req.body.status;
		post.last_mod = new Date();



		if (post.status == "publication") {			
			var ester= new Ester();
			ester.post = post._id;
			ester.type = post.type;
			if (req.body.tags != "") {
				ester.tags = post.tags;	
			}			
			post.ester = ester._id;
		};		

		
		if(req.files) {
			if (req.files['photo_file']) {
				var photo = {};
				photo['url'] = '/img/'+ req.files['photo_file'][0]['filename'];
				photo['path'] = req.files['photo_file'][0]['path'];
				post.photo = photo;
				im.resize({
				  srcPath: photo['path'],
				  dstPath: photo['path'],
				  height:   500,
				  filter: 'Lagrange',
				}, function(err, stdout, stderr){
				  if (err)  console.dir(arguments);
				  im.crop({
					  srcPath: photo['path'],
					  dstPath: photo['path'],
					  width: 500,
					  height: 500			 
					  
					});
				});
							
			}			
			if (req.files['songs_files']) {
					post.songs = [];
					var songs = req.files['songs_files'];
					
					songs.forEach(function(song_array, index, array) {
						
						id3({ file: song_array['path'], type: id3.OPEN_LOCAL }, function(err, tags) {
							 if (!err) {
							 	var id = (tags.artist +'-'+ tags.title).replace(/\s+/g, '');
							 	Song.findOne({ id: id}, function (err, song_old){
							 		if (err){

							 		}
							 		if (!song_old) {
							 			var newSong = new Song();
							 			var newSong = new Song();
										newSong.id = id;				
										newSong.path = song_array['path'];	
										newSong.podcast = 'post';								
										newSong.title = tags.title;
										newSong.artist = tags.artist;										
										newSong.save(function(err, song){
											if (err){
												console.log('Error in Saving song: '+err);  
												throw err;  
											}								    
											console.log('song succesful saving' + song);		              
										});								
							 		}
							 	})


							 	var song = {
									url : '/sound/'+ song_array['filename'],
									path : song_array['path'],
									title:  tags.title,
									artist: tags.artist
								}; 
								post.songs.push(song);
								console.log("post songs");
								console.log(post.songs);
								if (index === array.length - 1) {
									console.log("Last");
									console.log(post);
						            save_post(post);
					        	}	
							 }
							
						})
												
					})
			}
			else {
				post.save(function(err, post) {
					if (err)
						return res.send(500, err);
					if (post.status == "publication") {				
						ester.save(function(err, ester) {
							if (err)
								return res.send(500, err);					
							return res.send(200, null);
						});
					}
					else 				
						return res.send(200, null);		
				});
			}		
		}
		else {
			post.save(function(err, post) {
				if (err)
					return res.send(500, err);
				if (post.status == "publication") {				
					ester.save(function(err, ester) {
						if (err)
							return res.send(500, err);					
						return res.send(200, null);
					});
				}
				else 				
					return res.send(200, null);		
			});
		}
		
		
	}) 	
	
	


router.route('/posts:title?:offset?')
	

	.get(function(req, res){

		if (req.query.title == "") {
			Post
			.find()
			.sort({created_at: 'desc'})
			.limit(20)
			.skip( 20 * req.query.offset)
			.select('title status created_at last_mod author')			
			.exec(function (err, post) {
				if(err){
					return res.send(500, err);
				}			
				return res.send(200, post);
			});

		}
		else {
			var a = new RegExp(req.query.title,'gi');

			Post
				.find({title: a})
				.sort({created_at: 'desc'})
				.limit(20)
				.skip( 20 * req.query.offset)
				.select('title status created_at last_mod')
				
				.exec(function (err, post) {
					if(err){
						return res.send(500, err);
					}			
					return res.send(200, post);
				});
		}
			
		

	});


router.route('/posts/:id')

	.get(function(req, res){
		if (req.params.id != 'undefined') {
			Post.findById(req.params.id)
			.populate('tags')
			.exec(function(err, post){
				if(err)
					res.send(err);
				
				res.json(post);
			});
		}
		
	}) 
	
	.post(cpUpload, function(req, res) {

		var save_post = function(post) {
			var old_status = post.status;
			post.title = req.body.title;
			post.author = req.body.author;
			post.annotation = req.body.annotation;
			post.content = req.body.content;
			post.last_mod = new Date();
			console.log("я тут 5")
			if (req.body.tags != "") {
				post.tags = JSON.parse(req.body.tags);	
			}		

			post.urlname = req.body.urlname;
			post.type = req.body.type;
			
			post.status = req.body.status;
			
			if (post.status == "publication") {
				if (old_status == "draft") {

					var ester= new Ester();
					ester.post = post._id;
					ester.type = post.type;
					if (req.body.tags != "") {
						ester.tags = JSON.parse(req.body.tags);	
					}
				
					post.ester = ester._id;

					post.save(function(err, post){
						if(err)
							res.send(err);
						ester.save(function(err, ester) {
							if (err)
								return res.send(500, err);						
							return res.send(200, null);
						});
					});
				}
				else {
					Ester.findById(post.ester, function (err, ester) {
						if(err)
							return res.send(500, err);

							post.ester = ester._id;					
							ester.post = post._id;
							ester.type = post.type;
							if (req.body.tags != "") {
								ester.tags = JSON.parse(req.body.tags);	
							}				
							

							post.save(function(err, post){
								if(err)
									res.send(err);
								ester.save(function(err, ester) {
									if (err)
										return res.send(500, err);						
									return res.send(200, null);
								});
							});
					});
				}
				
			}
			else {
				if (old_status == "publication") {
					post.save(function(err, post){
						if(err)
							res.send(err);	
						Ester.findById(post.ester, function (err, ester) {
						if(err)
							return res.send(500, err);
						
						Ester.remove({
							_id: ester._id
						}, function(err) {
							if (err)
								res.send(err);		
							return res.send(200, null);
						});
					});									
											
					});
				}
				else {
					post.save(function(err, post){
						if(err)
							res.send(err);											
						return res.send(200, null);						
					});
				}
			}
		}
	
		Post.findById(req.params.id, function(err, post) {
			if(err)
				res.send(err);
			
			// если пользователь удалил старое фото 
			if(req.body.photo == 'null' && post.photo != null) {	
				
					var path = post.photo.path;					
					post.photo = null;					 				
					try {
						fs.unlink(path);
					} catch (err) {								
			       		return	res.send(err);	
					}					
				
			}
			// если пользователь удалил старый трек 
			if(req.body.songs == 'null' && post.songs != null) {
				var songs = post.songs;
				post.songs = null;
				for (var i = 0; i < songs.length; i++) {
					try {
						console.log("я тут 1");
						fs.unlink(songs[i].path);
					} 
					catch (err) {
						console.log("я тут 2");
						return	res.send(err);	       	
					}		
				};							
			}
			if(req.files) {
				if (req.files['photo_file']) {
					var photo = {};
					photo['url'] = '/img/'+ req.files['photo_file'][0]['filename'];
					photo['path'] = req.files['photo_file'][0]['path'];
					post.photo = photo;
					im.resize({
					  srcPath: photo['path'],
					  dstPath: photo['path'],
					  height:   500,
					  filter: 'Lagrange',
					}, function(err, stdout, stderr){
					  if (err)  console.dir(arguments);
					  im.crop({
						  srcPath: photo['path'],
						  dstPath: photo['path'],
						  width: 500,
						  height: 500			  
						});
					});
								
				}			
				if (req.files['songs_files']) {
					post.songs = [];
					var songs = req.files['songs_files'];
					
					songs.forEach(function(song_array, index, array) {
						
						id3({ file: song_array['path'], type: id3.OPEN_LOCAL }, function(err, tags) {
							 if (!err) {
							 	var id = (tags.artist +'-'+ tags.title).replace(/\s+/g, '');
							 	Song.findOne({ id: id}, function (err, song_old){
							 		if (err){
							 			console.log("я тут 3")
							 			return	res.send(err);
							 		}
							 		if (!song_old) {
							 			var newSong = new Song();
							 			var newSong = new Song();
										newSong.id = id;				
										newSong.path = song_array['path'];	
										newSong.podcast = 'post';								
										newSong.title = tags.title;
										newSong.artist = tags.artist;										
										newSong.save(function(err, song){
											if (err){
												console.log('Error in Saving song: '+err);  
												throw err;  
											}								    
											console.log('song succesful saving' + song);		              
										});								
							 		}
							 	})


							 	var song = {
									url : '/sound/'+ song_array['filename'],
									path : song_array['path'],
									title:  tags.title,
									artist: tags.artist
								}; 
								post.songs.push(song);
								console.log("post songs");
								console.log(post.songs);
								console.log("я тут 3")
								if (index === array.length - 1) {
									console.log("Last");
									console.log(post);
									console.log("я тут 4")
						            save_post(post);
					        	}	
							 }
							
						})
												
					})



				}
				else {
					save_post(post)
				}

			}
			else {
				save_post(post)
			}	
			
		});
	})
	
	.delete(function(req, res) {

		if (req.params.id) {
				Post.findById(req.params.id, function(err, post) {
					if(err)
						res.send(err);				
					if (post.photo != null) {
						try {
							fs.unlink(post.photo.path);
						} catch (err) {								
				       				
						}			
						
					} 
					if (post.songs != null) {
						for (var i = 0; i < post.songs.length; i++) {
							try {
								fs.unlink(post.songs[i].path);
							} 
							catch (err) {
										       	
							}		
						};	
					} 
					Post.remove({
						_id: post._id
					}, function(err) {
						if (err)
							res.send(err);
						if (post.status == "publication") {
							Ester.findById(post.ester, function (err, ester) {
								if(err)
									return res.send(500, err);
								
								Ester.remove({
									_id: ester._id
								}, function(err) {
									if (err)
										res.send(err);		
									res.json("deleted :(");
								});
							});
						}
						else {
							res.json("deleted :(");
						}								
											
					});
					
				
		
				});
			}
			else
				res.send(500, err);

		
	});



router.route('/timetable')	
	
	.post(function(req, res){
		
		var timetable = new Timetable();
		timetable.events = req.body.events		
		var date = new Date(req.body.date);	
		var dt = date.toDateString();
		var newdt = new Date(dt);
		timetable.date = newdt;				
		timetable.date_string = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
		
		timetable.save(function(err, timetable) {
			if (err){
				return res.send(500, err);
			}
			console.log(timetable);
			return res.send(200, null);
		});
	});
	

router.route('/timetable:offset?')	
	.get(function(req, res){
		
		Timetable
			.find()
			.sort({created_at: 'desc'})
			.limit(20)
			.skip( 20 * req.query.offset)
			.select('comment date')
			.sort({date: 'desc'})
			.exec(function (err, timetable) {
				if(err){
					return res.send(500, err);
				}			
				return res.send(200, timetable);
			});
	});

router.route('/timetable/:id')

	.get(function(req, res){
		Timetable.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			res.json(post);
		});
	}) 
	
	.put(function(req, res){
		Timetable.findById(req.params.id, function(err, timetable){
			if(err)
				res.send(err);

			timetable.events = req.body.events		
		var date = new Date(req.body.date);	
		var dt = date.toDateString();
		var newdt = new Date(dt);
		timetable.date = newdt;				
		timetable.date_string = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();		
			
			timetable.save(function(err, timetable){
				if(err)
					res.send(err);

				res.json(200, null);
			});
		});
	})
	
	.delete(function(req, res) {
			if (req.params.id) {
				Timetable.remove({
							_id: req.params.id
						}, function(err) {
							if (err)
								res.send(err);
							res.json("deleted :(");
						});
			}
			else
				res.send(500, err);
		
	});


router.route('/instagram:offset?')
	
	.get(function(req, res){	

	
			Instagram
			.find()
			.sort({created_at: 'desc'})
			.limit(15)
			.skip( 15 * req.query.offset)
			.select('title url created_at content author')			
			.exec(function (err, instagram) {
				if(err){
					return res.send(500, err);
				}			
				return res.send(200, instagram);
			});		
		

	});

router.route('/instagram')	
		
	.post(function(req, res) {

		var instagram = new Instagram();
		var ester= new Ester();

		instagram.title = req.body.title;
		instagram.url = req.body.url;
		instagram.content = req.body.content;
		instagram.author = req.body.author;
		instagram.ester = ester._id,
		ester.instagram = instagram._id;
		ester.type = "instagram";
		if (req.body.tags != "") {
			instagram.tags = req.body.tags;	
			ester.tags = req.body.tags;
		}
		
		instagram
			.save(function(err, instagram) {
			
				if (err)
					return res.send(500, err);	

					ester
						.save(function(err, ester) {
							if (err){
								return res.send(500, err);
							}
							return res.send(200, null);
						});		

			});

	})	
	

router.route('/instagram/:id')	
	
	.delete(function(req, res) {

		if (req.params.id) {
			Instagram
						.findById(req.params.id, function (err, instagram) {
							if(err)
								return res.send(500, err);				
										
							Instagram
								.remove({_id: instagram._id}, function(err) {
										if (err)
											res.send(err);
									  	Ester
									  		.findById(instagram.ester, function (err, ester) {
												if(err){
													return res.send(500, err);
												}			
												Ester
													.remove({_id: ester._id}, function(err) {
														if (err)
															res.send(err);		
												   		res.json("deleted :(");
													});
											});		
								});
					});
		}
		else
			res.send(500, err);


		
		
	});



router.route('/soundcloud:offset?')

	.get(function(req, res){
		
		SoundCloud
			.find()
			.sort({created_at: 'desc'})
			.limit(15)
			.skip( 15 * req.query.offset)
			.exec(function (err, soundCloud) {

				if(err){
					return res.send(500, err);
				}			
				return res.send(200, soundCloud);

			});
	});



router.route('/soundcloud')	
		
	.post(function(req, res) {

		var soundCloud = new SoundCloud();
		var ester= new Ester();

		soundCloud.title = req.body.title;
		soundCloud.url = req.body.url;
		soundCloud.ester = ester._id,
		ester.sound_cloud = soundCloud._id;
		ester.type = "SoundCloud";
		
		if (req.body.tags != "") {
			soundCloud.tags = req.body.tags;	
			ester.tags = req.body.tags;
		}
		console.log(soundCloud);
		console.log(ester);
		soundCloud
			.save(function(err, soundCloud) {
			
				if (err)
					return res.send(500, err);	

					ester
						.save(function(err, ester) {
							if (err){
								return res.send(500, err);
							}
							return res.send(200, null);
						});		

			});

	});	
	
	

router.route('/soundcloud/:id')	
	
	.delete(function(req, res) {
		if (req.params.id) {
			SoundCloud
			.findById(req.params.id, function (err, soundCloud) {
				if(err)
					return res.send(500, err);				
				
				SoundCloud
					.remove({_id: soundCloud._id}, function(err) {
							if (err)
								res.send(err);
						  	Ester
						  		.findById(soundCloud.ester, function (err, ester) {
									if(err){
										return res.send(500, err);
									}			
									Ester
										.remove({_id: ester._id}, function(err) {
											if (err)
												res.send(err);		
									   		res.json("deleted :(");
										});
								});		
					});
			});

		}
		else
			res.send(500, err);
		
		
	});

router.route('/video:offset?')
	.get(function(req, res){
			
			Video
				.find()
				.sort({created_at: 'desc'})
				.limit(15)
				.skip( 15 * req.query.offset)
				.exec(function (err, video) {
					if(err){
						return res.send(500, err);
					}			
					return res.send(200, video);
				});
		});

router.route('/video')	
		
	.post(function(req, res) {

		var video = new Video();
		var ester= new Ester();

		video.title = req.body.title;
		video.url = req.body.url;	
		video.ester = ester._id;

		ester.video = video._id;
		ester.type = "video";
		if (req.body.tags != "") {
		    video.tags = req.body.tags;	
			ester.tags = req.body.tags;
		};

		video
			.save(function(err, video) {
				if (err){
					return res.send(500, err);
				}
				ester
					.save(function(err, ester) {
						if (err){
							return res.send(500, err);
						}
						return res.send(200, null);
					});	
			});
	}); 
	
	

router.route('/video/:id')	

	.delete(function(req, res) {
		if (req.params.id) {
			Video
			.findById(req.params.id, function (err, video) {
				if(err)
					return res.send(500, err);						
				Video
					.remove({_id: video._id}, function(err) {
							if (err)
								res.send(err);
						  	Ester
						  		.findById(video.ester, function (err, ester) {
									if(err){
										return res.send(500, err);
									}			
									Ester
										.remove({_id: ester._id}, function(err) {
											if (err)
												res.send(err);		
									   		return res.send(200, null);
										});
								});		
					});
		});
		}
		else {
			res.send(500, err);
		}

		
	});

router.route('/tag:offset?')

	.get(function(req, res){		
		Tag
			.find()
			.sort({created_at: 'desc'})
			.limit(30)
			.skip( 30 * req.query.offset)
			.exec(function (err, tag) {
				if(err){
					return res.send(500, err);
				}			
				return res.send(200, tag);
			});
	});



router.route('/tag')	
		
	.post(function(req, res){	
		console.log(req.body);
		var tag = new Tag();
		tag.name = req.body.name;
		tag.urlname = req.body.urlname;
		// tag.weight = req.body.weight.value;		
		console.log(tag);
		tag.save(function(err, tag) {
			if (err){
				return res.send(500, err);
			}
			return res.send(200, null);
		});
	})		
	

router.route('/tag/:id')	
	
	
	.delete(function(req, res) {
	if (req.params.id) {
		Tag.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	} 
	else
		return res.send(500, err);	

		
	});


	router.route('/people')	
		
	.post(peopleUpload, function(req, res) {
		
		var people = new People();	
		people.title = req.body.title;
		people.author = req.body.author;
		people.content = req.body.content;		
		people.urlname = req.body.urlname;			
		people.photo = null;
		people.status = req.body.status;
		people.last_mod = new Date();

		
		if (req.file) {
				var photo = {};
				photo['url'] = '/img/'+ req.file['filename'];
				photo['path'] = req.file['path'];
				people.photo = photo;
				im.resize({
				  srcPath: photo['path'],
				  dstPath: photo['path'],
				  height:   400,
				  filter: 'Lagrange',
				}, function(err, stdout, stderr){
				  if (err)  console.dir(arguments);
				  im.crop({
					  srcPath: photo['path'],
					  dstPath: photo['path'],
					  width: 400,
					  height: 400,					 
					  
					});
				});
							
		};		
				

		people.save(function(err, post) {
			if (err)
				return res.send(500, err);
			res.send(200, null);				
		});

	})	


router.route('/people:title?:offset?')

	.get(function(req, res) {
		if (req.query.title == "") {
			People
			.find()
			.sort({created_at: 'desc'})
			.limit(20)
			.skip( 20 * req.query.offset)
			.select('title status created_at last_mod author')			
			.exec(function (err, people) {
				if(err)
					return res.send(500, err);
				
				res.send(200, people);
			});

		}
		else {

			var a = new RegExp(req.query.title,'gi');
			People
				.find({title: a})
				.sort({created_at: 'desc'})
				.limit(20)
				.skip( 20 * req.query.offset)
				.select('title status created_at last_mod')				
				.exec(function (err, people) {
					if(err)
						return res.send(500, err);
						
					res.send(200, people);
				});
		}
			
		

	});


router.route('/people/:id')

	.get(function(req, res){
		if (req.params.id != 'undefined') {
			People.findById(req.params.id)			
			.exec(function(err, people){
				if(err)
					res.send(err);				
				res.json(people);
			});
		}
		
	}) 
	
	.post(peopleUpload, function(req, res) {

	
		People.findById(req.params.id, function(err, people){
			if(err)
				res.send(err);
			
			// если пользователь удалил старое фото 
			if(req.body.photo == 'null' && people.photo != null) {	
				
					var path = people.photo.path;					
					people.photo = null;					 				
					try {
						fs.unlink(path);
					} catch (err) {								
			       				
					}					
				
			}
			
			
			if (req.file) {
					var photo = {};
					photo['url'] = '/img/'+ req.file['filename'];
					photo['path'] = req.file['path'];
					people.photo = photo;
					im.resize({
					  srcPath: photo['path'],
					  dstPath: photo['path'],
					  height:   400,
					  filter: 'Lagrange',
					}, function(err, stdout, stderr){
					  if (err)  console.dir(arguments);
					  im.crop({
						  srcPath: photo['path'],
						  dstPath: photo['path'],
						  width: 400,
						  height: 400,					 
						  
						});
					});
								
			}			
				
			

			people.title = req.body.title;
			people.author = req.body.author;
			people.content = req.body.content;		
			people.urlname = req.body.urlname;	
			people.status = req.body.status;
			people.last_mod = new Date();			
			
			

			people.save(function(err, people){
				if(err)
					res.send(err);											
					return res.send(200, null);						
			});
		
			
		});
	})
	
	.delete(function(req, res) {

		if (req.params.id) {
			People.findById(req.params.id, function(err, people){
				if(err)
					res.send(err);				
				if (people.photo != null) {
					try {
						fs.unlink(people.photo.path);
					} catch (err) {								
			       				
					}			
					
				} 
				
				People.remove({
					_id: people._id
				}, function(err) {
					if (err)
						res.send(err);					
					res.json("deleted :(");					
				});
					
				
		
			});
		}
		else
			res.send(500, err);

		
	});









var savePhoto = function() {

};

module.exports = router;