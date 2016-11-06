var fs = require('fs');
var CronJob = require('cron').CronJob;
var id3 = require('id3js');
var mongoose = require('mongoose');   
var Song = mongoose.model('Song');
var Podcast = mongoose.model('Podcast');




var parseMain= new CronJob({
  cronTime: '0 0 */1 * * *',
  onTick: function() {
        fs.readdir('/var/www/music/main', function(err, songs) {	
		if (!err) {		
			songs.forEach(function(song, index, array) {
				var path = '/music/main/' + song;
				var podcast = 'Main';	
				console.log('/music/main/' + song);		
				id3({ file: '/var/www' + path, type: id3.OPEN_LOCAL }, function(err, tags) {				
				   if (!err) {			   	
				   		var id = (tags.artist +'-'+ tags.title).replace(/\s+/g, '');			   		
				   		Song.findOne({ id: id}, function (err, song_old){
						    if (!song_old) {		
								var newSong = new Song();
								newSong.id = id;				
								newSong.path = path;	
								newSong.podcast = podcast;								
								newSong.title = tags.title;
								newSong.artist = tags.artist;										
								newSong.save(function(err, song){
									if (err){
										console.log('Error in Saving song: '+err);  
										throw err;  
									}	
									console.log(index);							    
									console.log('song succesful saving' + song);		              
								});									 
							};
						});
				  	};
				});
			});
		};
		
	});
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

parseMain.start();



var parseBroadcast = new CronJob({
  cronTime: '0 15 */1 * * *',
  onTick: function() {
	fs.readdir('/var/www/music/broadcasts', function(err, songs) {	
		if (!err) {		
			songs.forEach(function(song, index, array) {
				var path = '/music/broadcasts/' + song;
				var podcast = 'broadcasts';	
				console.log('/music/broadcasts/' + song);		
				id3({ file: '/var/www' + path, type: id3.OPEN_LOCAL }, function(err, tags) {				
				   if (!err) {			   	
				   		var id = (tags.artist +'-'+ tags.title).replace(/\s+/g, '');			   		
				   		Song.findOne({ id: id}, function (err, song_old){
						    if (!song_old) {		
								var newSong = new Song();
								newSong.id = id;				
								newSong.path = path;	
								newSong.podcast = podcast;								
								newSong.title = tags.title;
								newSong.artist = tags.artist;										
								newSong.save(function(err, song){
									if (err){
										console.log('Error in Saving song: '+err);  
										throw err;  
									}	
									console.log(index);							    
									console.log('song succesful saving' + song);		              
								});									 
							};
						});
				  	};
				});
			});
		};
		
	});
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

parseBroadcast.start();

var parseMixes= new CronJob({
  cronTime: '0 20 */1 * * *',
  onTick: function() {
	fs.readdir('/var/www/music/mixes', function(err, songs) {	
		if (!err) {		
			songs.forEach(function(song, index, array) {
				var path = '/music/mixes/' + song;
				var podcast = 'mixes';	
				console.log('/music/mixes/' + song);		
				id3({ file: '/var/www' + path, type: id3.OPEN_LOCAL }, function(err, tags) {				
				   if (!err) {			   	
				   		var id = (tags.artist +'-'+ tags.title).replace(/\s+/g, '');			   		
				   		Song.findOne({ id: id}, function (err, song_old){
						    if (!song_old) {		
								var newSong = new Song();
								newSong.id = id;				
								newSong.path = path;	
								newSong.podcast = podcast;								
								newSong.title = tags.title;
								newSong.artist = tags.artist;										
								newSong.save(function(err, song){
									if (err){
										console.log('Error in Saving song: '+err);  
										throw err;  
									}	
									console.log(index);							    
									console.log('song succesful saving' + song);		              
								});									 
							};
						});
				  	};
				});
			});
		};
		
	});
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

parseMixes.start();