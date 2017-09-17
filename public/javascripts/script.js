$(document).ready(function () {

	var types = ['n', 'a', 't', 'i', 'e', 'z', 's'];


	$("#generate").click(function () {
		var params = {
			quantity: $("#quantity").val(),
			type: $("#type").is(':checked')
		};
		types.forEach(function(t){
			params['type_' + t] = $('#type_' + t).is(':checked');
		});

		$.ajax({
			type: 'POST',
			url: '/',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(params),
			success: function (res) {
				$("#randomWords").text(res.randomWords);
			},
			error: function (res) {
				console.log('error');
				console.log(res);
				$("#randomWords").text("");
			}
		});
	});

	$("#type").click(function () {
		var disable = $("#type").is(':checked');
		types.forEach(function(t){
			$('#type_' + t).attr('disabled', disable);
		});
	});

});