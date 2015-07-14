var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/posts');

var Post = require('./models/post');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

//Load index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//Get all posts
app.get('/api/posts', function (req, res) {
	Post.find(function (err, posts) {
		res.json(posts);
	});
});

//Get a single post
app.get('/api/posts/:id', function (req, res) {
	var targetId = req.params.id;

	Post.findOne({_id: targetId}, function (err, foundPost) {
		res.json(foundPost);
	});
});

//Create a new post
app.post('/api/posts', function (req, res) {
	var newPost = new Post({
		title: req.body.title,
		author: req.body.author,
		tag: req.body.tag,
		content: req.body.content,
		location: req.body.location,
		picture: req.body.picture
	});

	newPost.save(function (err, savedPost) {
		res.json(savedPost);
	});
});

//Delete a post
app.delete('/api/posts/:id', function (req, res) {
	var targetId = req.params.id;

  Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
    res.json(deletedPost);
  });
});

//Update a post
app.put('/api/posts/:id', function (req, res) {
	var targetId = req.params.id;

	Post.findOne({_id: targetId}, function (err, foundPost) {
		foundPost.title = req.body.title;
		foundPost.author = req.body.author;
		foundPost.tag = req.body.tag;
		foundPost.content = req.body.content;
		foundPost.location = req.body.location;
		foundPost.picture = req.body.picture;

		foundPost.save(function (err, savedPost) {
			res.json(savedPost);
		});
	});
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});