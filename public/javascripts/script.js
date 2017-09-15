
$(document).ready(function () {
	$("#generate").click(function () {
		$.ajax({
			type: 'POST',
			url: '/',
			contentType: 'application/json',
			dataType: 'json',
			success: function (res) {
				$("#randomWord").text(res.randomWord);
			},
			error: function (res) {
				console.log('error');
				console.log(res);
				$("#randomWord").text("");
			}
		});
	});
});