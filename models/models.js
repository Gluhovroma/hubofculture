var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
})

var vkuserSchema = new mongoose.Schema({
	username: String,
	photoUrl: String,
	profileUrl:String,
	created_at: {type: Date, default: Date.now},
	like_tracks: {}, // name, url
	like_news:[],	// ester
	like_playlists:[]	//playlist
})

var postSchema = new mongoose.Schema({	
	author: String,		
	created_at: {type: Date, default: Date.now},//
	last_mod: {type: Date, default: Date.now},//
	type: String,
	title: String,
	annotation: String,
	content: String,
	status: String,	
	photo: {},		
	tags: [{ type: Schema.ObjectId, ref: 'Tag' }],
	songs: [],	
	urlname:String,
	ester: String,
	
});
var instagramSchema = new mongoose.Schema({
	title: String, 
	url: String,
	author: String,	
	created_at: {type: Date, default: Date.now},
	content: String,
	ester: String,
	tags: [{ type: Schema.ObjectId, ref: 'Tag' }]
});

var esterSchema = new mongoose.Schema({	
	created_at: {type: Date, default: Date.now},//
	post: { type: Schema.ObjectId, ref: 'Post1212' },	
	instagram: { type: Schema.ObjectId, ref: 'Instagram1212' },
	video: { type: Schema.ObjectId, ref: 'Video1' },
	sound_cloud : { type: Schema.ObjectId, ref: 'SoundCloud' },
	tags: [{ type: Schema.ObjectId, ref: 'Tag' }],
	type: String,
	likes:String
});

var songSchema = new mongoose.Schema({
	id:String,
	title: String, 
	artist: String,
	created_at: {type: Date, default: Date.now},//	
	path: String,
	podcast: String,
	artist:String,
	album:String,
	year:String
});

var podcastSchema = new mongoose.Schema({
	title: String, 
	folder: String,
	created_at: {type: Date, default: Date.now}		
});

var videoSchema = new mongoose.Schema({
	title: String, 
	url: String,
	created_at: {type: Date, default: Date.now},//	
	ester: String,
	tags: [{ type: Schema.ObjectId, ref: 'Tag' }]
});

var sound_cloudSchema = new mongoose.Schema({
	title: String, 
	url: String,
	created_at: {type: Date, default: Date.now},//	
	ester: String,
	tags: [{ type: Schema.ObjectId, ref: 'Tag' }]
});

var coubSchema = new mongoose.Schema({
	title: String, 
	url: String,
	created_at: {type: Date, default: Date.now},//	
	ester: String,
	tags: [{ type: Schema.ObjectId, ref: 'Tag' }]
});

var timetableSchema = new mongoose.Schema({
	date: Date,	
	created_at: {type: Date, default: Date.now},
	events:[],
	date_string: String
});

var peopleSchema = new mongoose.Schema({	
	author: String,		
	created_at: {type: Date, default: Date.now},//
	last_mod: {type: Date, default: Date.now},//	
	title: String,	
	content: String,
	status: String,	
	photo: {},		
	urlname:String	
});

var tagSchema = new mongoose.Schema({
	name: String,
	urlname: String,
	weight: Number,
	created_at: {type: Date, default: Date.now}
});

var infoSchema = new mongoose.Schema({
	content: String,	
});
var authorSchema = new mongoose.Schema({
	content: String,	
});
var creatorSchema = new mongoose.Schema({
	content: String,	
});
var djSchema = new mongoose.Schema({
	content: String,	
});
var moviemakerSchema = new mongoose.Schema({
	content: String,	
});

mongoose.model('User', userSchema);
mongoose.model('VKUser', vkuserSchema);
mongoose.model('Instagram1212', instagramSchema);
mongoose.model('Tag', tagSchema);
mongoose.model('Post1212', postSchema);
mongoose.model('Timetable', timetableSchema);
mongoose.model('Video1', videoSchema);
mongoose.model('SoundCloud', sound_cloudSchema);
mongoose.model('Coub', coubSchema);
mongoose.model('Ester21212', esterSchema);
mongoose.model('People', peopleSchema);
mongoose.model('Info', infoSchema);
mongoose.model('Author', authorSchema);
mongoose.model('Creator', creatorSchema);
mongoose.model('Dj', djSchema);
mongoose.model('Moviemaker', moviemakerSchema);
mongoose.model('Song', songSchema);
mongoose.model('Podcast', podcastSchema);