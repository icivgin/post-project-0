var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	
	title: String,
	author: String,
	tag: String,
	content: String,
	location: String,
	picture: String

});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;