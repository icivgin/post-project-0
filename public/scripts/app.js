$(function() {

	var userIdCount = 0;
	var postIdCount = 5;

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

	function Post (title, author, tag, content, location, picture, prevId) {
		if(!prevId) {
			this.id = postIdCount;
		}
		else {
			this.id = prevId;
		}
		this.title = title;
		this.author = author;
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

		//tag load to be used to show only certain tags
		// tags: function() {
		// 	$.get('http://localhost:3000/api/posts', function (data) {
		// 		var allPosts = data;

		// 		_.each(allPosts, function(post) {
		// 			var tags = [];
		// 			tags.push(post.tag);
					
		// 			//Add post tags to list template

		// 		});
		// 	});
		// },

		//create
		create: function(newPost) {
			$.ajax({
				url: 'http://localhost:3000/api/posts',
				type: 'POST',
				data: newPost,
				success: function (data) {
					$("#new-post-modal").modal("hide");
				},
				error: function() {
					alert('Error!');
				}
			});
		},

		// update
		update: function (updatedPost, updateId) {
			$.ajax({
				url: 'http://localhost:3000/api/posts/' + updateId,
				type: 'PUT',
				data: updatedPost,
				success: function (data) {
					$(".edit-post-modal").modal("hide");
					$('#' + updateId).replaceWith(postController.template(updatedPost));
				},
				error: function() {
					alert('Error!');
				}
			});
		},

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

			    // for delete: click event on `.delete-post` button
			    .on('click', '.delete-post', function(event) {
			      event.preventDefault();
			      var deleteId = $(this).closest('.post').attr('id');
			      postController.delete(deleteId);
			    })

			    //update
			    .on('submit', '.update-post', function(event) {
			    	event.preventDefault();

			    	var updateId = $(this).closest('.update-post').attr('data-id');
			    	var updatedPost = new Post(
			    			$(this).find('#edit-title').val(),
			    			$(this).find('#edit-author').val(),
			    			$(this).find('#edit-tag').val(),
			    			$(this).find('#edit-content').val(),
			    			$(this).find('#edit-location').val(),
			    			$(this).find('#edit-picture').val(),
			    			updateId
			    		);

			    	postController.update(updatedPost, updateId);
			    })

		},


		//setup view
		setupView: function() {
			postController.clear();
			postController.all();

			// add event-handler to new-phrase form
			$('#new-post-form').on('submit', function(event) {
			  event.preventDefault();
			  var newPostFromForm = new Post ($('#title').val(), $('#author').val(), $('#tag').val(), $('#content').val(), $('#location').val(), $('#picture').val())
			  console.log(newPostFromForm);
			  $('#post-list').append(postController.template(newPostFromForm));

			  postController.create(newPostFromForm);
			  
			  // reset the form
			  $(this)[0].reset();
			  $('#author').focus();

			});
		}
		
	}

	postController.setupView();

})