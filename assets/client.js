
$(document).ready(function() {
$('#form').submit(function() {
	var url = '/articles';
	var post = {
		title: $('#title').val(),
		body: $('#body').val(),
		thumbnail: $('#thumb').files[0]
	}
	console.log(post);


	/*$.ajax({
		type: 'POST',
		url: url,
		data: post,
        enctype: 'multipart/form-data',
		success: function() {
			console.log('Posted!')
		}
	});*/

	return false
});

})