$(function() {

	var userIdCount = 0;
	// var postIdCount = 5;

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

	function Post (title, author, tag, content, location, picture) {
		this.title = title;
		this.author = author;
		this.tag = tag;
		this.content = content;
		this.location = location;
		this.picture = picture;
		this.type = 'post';
	}

	function Comment (commentBody, postId) {
		this.commentAuthor = 'Ian Civgin';
		this.commentDate = new Date().toDateString();
		this.commentBody = commentBody;
		this.postId = postId;
		this.type = 'comment';
	}

	var postController = {

		//Template
		template: _.template($('#post-template').html()),
		commentTemplate: _.template($('#comment-template').html()),

		//all
		all: function () {
			$.get('http://localhost:3000/api/posts', function (data) {
				var allPosts = data;

				_.each(allPosts, function(post) {
					var $newPost = $(postController.template(post));
					$('#post-list').append($newPost);
					console.log(post);
					_.each(post.comments, function(comment) {
						$('#comment-display-' + comment.postId).append(postController.commentTemplate(comment));
					});
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
					console.log(data);
					$("#new-post-modal").modal("hide");
					$('#post-list').append(postController.template(data));
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
					$('#' + updateId).replaceWith(postController.template(data));
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

		addComment: function (commentBody, postId) {
			var newComment = new Comment(commentBody, postId);
			$.ajax({
				url: 'http://localhost:3000/api/posts/' + postId,
				type: 'PUT',
				data: newComment,
				success: function (data) {
					$('#comment-display-' + postId).append(postController.commentTemplate(data.comments[data.comments.length - 1]));
					$('.comment-body').val('');
					// $('#' + postId).replaceWith(postController.template(data));

				},
				error: function() {
					alert('Error!');
				}
			});

		},

		deleteComment: function (postId, commentId) {
			$.ajax({
				url: 'http://localhost:3000/api/posts/' + postId + '/' + commentId,
				type: 'DELETE',
				success: function (data) {
					alert('GREAT!');
					console.log(data);
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
			    	console.log(updateId);
			    	var updatedPost = new Post(
			    			$(this).find('#edit-title').val(),
			    			$(this).find('#edit-author').val(),
			    			$(this).find('#edit-tag').val(),
			    			$(this).find('#edit-content').val(),
			    			$(this).find('#edit-location').val(),
			    			$(this).find('#edit-picture').val()
			    		);

			    	postController.update(updatedPost, updateId);
			    })

			    .on('click', '.add-comment', function(event) {
			    	event.preventDefault();
			    	var commentBody = $(this).parent().find('input').val();
			    	var postId = $(this).parent().parent().parent().parent().attr('data-id');
			    	console.log(postId);

			    	postController.addComment(commentBody, postId);
			    })

			    //delete comment
			    .on('click', '.delete-comment', function(event) {
			    	event.preventDefault();
			    	var r = confirm('Are you sure you want to delete this comment?');
			    	if(r) {
			    		var postId = $(this).parent().parent().parent().parent().parent().parent().attr('data-id');
				    	var comment = $(this).parent().parent();
				    	var commentId = $(this).parent().parent().attr('data-id');
				    	postController.deleteComment(postId, commentId);
				    	comment.remove();
			    	}
			    });

		},


		//setup view
		setupView: function() {
			postController.clear();
			postController.all();

			// add event-handler to new-phrase form
			$('#new-post-form').on('submit', function(event) {
			  event.preventDefault();
			  var newPostFromForm = new Post ($('#title').val(), $('#author').val(), $('#tag').val(), $('#content').val(), $('#location').val(), $('#picture').val() || 'http://cdn3.rd.io/user/no-user-image-square.jpg');
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