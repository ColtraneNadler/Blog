
$(document).ready(function() {
$('#form').submit(function() {
	var url = '/articles';
	var post = {
		title: $('#title').val(),
		body: $('#body').val(),
		thumbnail: $('#thumb').val();
	}

	console.log(post);


	$.ajax({
		type: 'POST',
		url: url,
		data: post,
		success: function() {
			console.log('Posted!')
		}
	});

	
	return false
});

})