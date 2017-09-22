$(document).ready(function () {

	$('#generate').click(function () {
		$('#exports').slideDown();
		new Clipboard('#copy');

		$.ajax({
			type: 'GET',
			url: '/generate?quantity=' + $("#quantity").val(),
			contentType: 'application/json',
			dataType: 'json',
			success: function (res) {
				console.log(res);
				var container = $("#randomWords");
				container.text('');
				var randomWords = res.randomWords;
				var all = "";
				randomWords.forEach(function(w, i){
					all +=  w + ((randomWords.length !== (i + 1)) ? ' ' : '');
				});
				container.append(all);
			},
			error: function (res) {
				console.log('error');
				console.log(res);
				$("#randomWords").text('');
			}
		});
	});

});