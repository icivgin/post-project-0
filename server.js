var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

var posts = [
	{
		id: 1,
		title: 'I had the coolest surf sesh yesterday',
		author: 'Ian Civgin',
		bio: "I'm a cool dude lookin to write about my adventures",
		tag: '#surfing',
		content: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
		location: 'San Francisco, CA',
		picture: 'https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/v/t1.0-9/11000679_678310838972910_3327933139625114426_n.jpg?oh=a91307c797979205cb5eec2b7d17d5d5&oe=565B8718'
	},
	{
		id: 2,
		title: 'I climbed a pretty cool thing',
		author: 'E.N. Civgin',
		bio: 'Alter ego of I.C., also a B.A.',
		tag: '#climbing',
		content: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
		location: 'San Fernando, CA',
		picture: 'https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpt1/t31.0-8/11043365_613309685473026_1961016179961777703_o.jpg'
	},
	{ 
		id: 3,
		title: 'I want to jam mon!',
		author: 'Bob Marley',
		tag: '#music',
		content: 'No sun will shine in my day today (no sun will shine)',
		location: 'Jamaica',
		picture: 'http://assets.rollingstone.com/assets/images/list_item/bob-marley-20110420/square.jpg',
		bio: 'I enjoyed green things (while I was alive)' 
	},
	{ 
		id: 4,
		title: 'This is a test',
		author: 'Ducky',
		tag: '#testing123',
		content: 'Oh my god there are so many damn forms to fill out! Why can\'t I make this any easier on myself?',
		location: 'San Francisco, CA',
		picture: 'http://squareonedsm.com/wp-content/uploads/2013/10/rubber-duck-300x300.jpg',
		bio: "I'm a baller"
	}
];

//Load index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//Load about.html
app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/public/views/about.html');
});

//Get all posts
app.get('/api/posts', function (req, res) {
	res.json(posts);
});

//Get a single post
app.get('/api/posts/:id', function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundPost = _.findWhere(posts, {id: targetId});

	res.json(foundPost);
});

//Create a new post
app.post('/api/posts', function (req, res) {
	var newPost = {};
	newPost.id = req.body.id;
	newPost.title = req.body.title;
	newPost.author = req.body.author;
	newPost.tag = req.body.tag;
	newPost.content = req.body.content;
	newPost.location = req.body.location;
	newPost.picture = req.body.picture;
	newPost.bio = req.body.bio;

	console.log(newPost);
	posts.push(newPost);

	res.json(newPost);
});

//Delete a post
app.delete('/api/posts/:id', function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundPost = _.findWhere(posts, {id: targetId});

	var indexOfPost = posts.indexOf(foundPost);
	posts.splice(indexOfPost, 1);

	res.json(posts);
});

//Update a post
app.put('/api/posts/:id', function (req, res) {

});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});