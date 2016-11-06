var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var CronJob = require('cron').CronJob;
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var im = require('imagemagick');
var Iconv = require('iconv-lite');
var id3 = require('id3js');

require('./models/models');

var index = require('./routes/index');
var admin = require('./routes/admin');
var login = require('./routes/login');
var adminapi = require('./routes/adminapi');

var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');                         //add for Mongo support
mongoose.connect('mongodb://localhost/dk');              //connect to Mongo
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false },{limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.render('index',{
        isMobile: '1'
    });
});
app.use('/admin', admin);
app.use('/admin-login', login);
app.use('/auth', authenticate);
app.use('/adminapi', adminapi);
app.use('/api', api);

app.get('*', function(req, res){
	
	
  res.render('index',{
        isMobile: '1'
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.redirect('/');
   
});


var initPassport = require('./passport-init');
initPassport(passport);

require('./sheduletasks');

if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.redirect('/');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.redirect('/');
});



// создание первого юзера


(function () {
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
    var User = mongoose.model('User');
    var bCrypt = require('bcrypt-nodejs');
    var newUser = new User();
    newUser.username = 'admin';
    newUser.password = createHash('dkfm2015');
    newUser.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
        }
        console.log(newUser.username + ' Registration succesful');   
                     
    });
      
    
})();


var track = '';
var live;
var parsed = '';
io.on('connection', function(socket) {
	io.emit('notification', {
						    	message: track      
					}); 
	
	var url = 'http://94.250.252.115:8000';
	
	setInterval(function() {
		
		live = false;
	   request(url, function(error, response, html){
	        if(!error){
	            var $ = cheerio.load(html);
	            $('div.newscontent').filter(function(){
	                var data = $(this);           
	                if (data.children()[0].children[0].children[5].children[1].children[0].children[0].data == "Mount Point /live") {   
	                	live = true;               	
		    			parsed = "Прямой эфир";
		    			
	                }
	                else if (data.children()[0].children[0].children[5].children[1].children[0].children[0].data == "Mount Point /play") { 
	                	if (live != true) {
							parsed = data.children()[1].children[17].children[3].children[0].data;
	                	}           
	                   	
	                }

	                                               
	            });
	            
	            if (parsed != track) {
	            	track = parsed;
	            	console.log("da");
	            	io.emit('notification', {
						    	message: track      
					}); 
	            }
	                       
	        }
	        
	    });
		

	}, 5000)	
})






var Song = mongoose.model('Song');
var Podcast = mongoose.model('Podcast');

fs.readdir('/var/www/music/main', function(err, songs) {	
	if (!err) {		
		songs.forEach(function(song, index, array) {
			var path = '/music/main/' + song;
			var podcast = 'main';			
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



var port = process.env.PORT || 3000;

server.listen(3000);
module.exports = app;
			           