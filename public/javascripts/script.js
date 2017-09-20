$(document).ready(function () {

	['txt', 'xlsx'].forEach(function(type){
		$('#' + type).click(function () {
			exportAs(type);
		});
	});

	$("#generate").click(function () {
		$("#exports").show();

		var params = {
			quantity: $("#quantity").val()
		};

		$.ajax({
			type: 'POST',
			url: '/generate',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(params),
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

function exportAs(type) {
	$.ajax({
		type: 'POST',
		url: '/export',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify({
			type: type
		}),
		success: function (res) {
			//TODO
			console.log('success');
			console.log(res);
		},
		error: function (res) {
			console.log('error');
			console.log(res);
		}
	});
}