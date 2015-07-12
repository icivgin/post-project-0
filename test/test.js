var request = require('request');
var expect = require('chai').expect;
var cheerio = require('cheerio');

var testPost = {
		id: 100,
		title: 'This is a test',
		author: 'Ian Civgin',
		tag: '#surfing',
		content: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
		location: 'San Francisco, CA'
}

describe('localhost:3000', function() {

	// GET: api/posts/:id
	it('/api/posts/:id || should find post id with tag #surfing', function(done) {
		request.get('http://localhost:3000/api/posts/1', function(err, res, body) {
			var resParse = JSON.parse(body);
			expect(resParse.tag).to.equal('#surfing');
			done();
		});
	});

	// POST: api/posts/
	it('/api/posts || should create post with title "This is a test"', function(done) {
		request.post('http://localhost:3000/api/posts', {form: testPost}, function(err, res, body) {
			var resParse = JSON.parse(body);
			expect(resParse.title).to.equal('This is a test');
			done();
		});
	});

	// DELETE: api/posts/:id
	it('/api/posts/:id || should delete this post', function(done) {
		request.del('http://localhost:3000/api/posts/100', function(err, res, body) {
			var resParse = JSON.parse(body);
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

});
