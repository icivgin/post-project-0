$(function() {

	var userIdCount = 0;
	var postIdCount = 4;

	// User Constructor when this functionality is added

	// function User (username, name, location, bio, picture) {
	// 	this.id = userIdCount;
	// 	this.username = username;
	// 	this.name = name;
	// 	this.location = location;
	// 	this.bio = bio;
	// 	this.picture = picture;
	// 	myPosts = [];
	// 	userIdCount++;
	// }

	function Post (title, author, bio, tag, content, location, picture) {
		this.id = postIdCount;
		this.title = title;
		this.author = author;
		this.bio = bio;
		this.tag = tag;
		this.content = content;
		this.location = location;
		this.picture = picture;

		postIdCount++;
	}

	var postController = {

		//Template
		template: _.template($('#post-template').html()),

		//all
		all: function () {
			$.get('http://localhost:3000/api/posts', function (data) {
				var allPosts = data;

				_.each(allPosts, function(post) {
					var $newPost = $(postController.template(post));
					$('#post-list').append($newPost);
				});
				postController.addEventHandlers();
			});
		},

		//tag load
		tags: function() {
			$.get('http://localhost:3000/api/posts', function (data) {
				var allPosts = data;

				_.each(allPosts, function(post) {
					var tags = [];
					tags.push(post.tag);
					
					//Add post tags to list template

				});
			});
		},

		//create
		create: function(newPost) {
			$.ajax({
				url: 'http://localhost:3000/api/posts',
				type: 'POST',
				data: newPost,
				success: function (data) {
					$("#new-post-modal").modal("hide");
					postController.setupView();
				},
				error: function() {
					alert('Error!');
				}
			});
		},

		//update
		//clear
		clear: function() {
			$('#post-list').html('');
		},

		//delete
		delete: function (deleteId) {

			$.ajax({
				url: 'http://localhost:3000/api/posts/' + deleteId,
				type: 'DELETE',
				success: function (data) {
					$('#' + deleteId).remove();
				}

			});
		},

		//add event handlers 
		addEventHandlers: function() {
		  $('#post-list')
		    
		    // for delete: click event on `.delete-phrase` button
		    .on('click', '.delete-post', function(event) {
		      event.preventDefault();
		      var deleteId = $(this).closest('.post').attr('id');
		      postController.delete(deleteId);
		    });
		},


		//setup view
		setupView: function() {
			postController.clear();
			postController.all();

			// add event-handler to new-phrase form
			$('#new-post-form').on('submit', function(event) {
			  event.preventDefault();
			  var newPostFromForm = new Post ($('#title').val(), $('#author').val(), $('#bio').val(), $('#tag').val(), $('#content').val(), $('#location').val(), $('#picture').val())
			  console.log(newPostFromForm);

			  postController.create(newPostFromForm);
			  
			  // reset the form
			  $(this)[0].reset();
			  $('#author').focus();

			});
		}
		
	}

	postController.setupView();

})