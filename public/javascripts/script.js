$(document).ready(function () {

	$("#generate").click(function () {
		$("#exports").slideDown();

		$.ajax({
			type: 'GET',
			url: '/generate?quantity=' + $("#quantity").val(),
			contentType: 'application/json',
			dataType: 'json',
			success: function (res) {
				console.log(res);
				$("#randomWords").text(res.randomWords);
			},
			error: function (res) {
				console.log('error');
				console.log(res);
				$("#randomWords").text("");
			}
		});
	});

});