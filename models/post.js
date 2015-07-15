var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Comment = require('./models/comment');

var CommentSchema = new Schema({
	commentAuthor: String,
	commentDate: String,
	commentBody: String,
	postId: String
});

var PostSchema = new Schema({
	
	title: String,
	author: String,
	tag: String,
	content: String,
	location: String,
	picture: String,
	comments: [CommentSchema]

});

var Post = mongoose.model('Post', PostSchema);
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Post;