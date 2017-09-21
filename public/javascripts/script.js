$(document).ready(function () {

	$('#xlsx').click(function () {
		exportExcel();
	});

	$('#txt').click(function () {
		exportTxt();
	});

	$("#generate").click(function () {
		$("#exports").show();

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

function exportExcel() {
	window.location.href = '/exportExcel';
}

function exportTxt() {
	window.location.href = '/exportTxt';
}