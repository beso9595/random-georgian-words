$(document).ready(function () {

	$('#quantity').keypress(function (e) {
		if (e.which === 13) {
			generateWords();
		}
	});

	$('#generate').click(function () {
		generateWords();
	});
});


function generateWords() {
	var quantityComp = $('#quantity');
	var wordContainerComp = $('#randomWords');
	new Clipboard('#copy');
	wordContainerComp.addClass('loading-mask');

	$.ajax({
		type: 'GET',
		url: '/generate?quantity=' + quantityComp.val(),
		contentType: 'application/json',
		dataType: 'json',
		success: function (res) {
			console.log(res);
			wordContainerComp.text('');
			var randomWords = res.randomWords;
			var all = "";
			randomWords.forEach(function (w, i) {
				all += '<kbd>' + w + '</kbd>' + ((randomWords.length !== (i + 1)) ? ' ' : '');
			});
			wordContainerComp.append(all);
			$('#exports').slideDown();
			wordContainerComp.removeClass('loading-mask');
		},
		error: function (res) {
			console.log('error');
			console.log(res);
			wordContainerComp.text('');
			wordContainerComp.removeClass('loading-mask');
		}
	});
}