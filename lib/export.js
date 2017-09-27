var nodeExcel = require('excel-export');

var exportExcel = function (res, words) {
	var conf = {
		name: "Random-Georgian-Words"
	};

	conf.cols = [{
		caption: words[0] || '',
		type: 'string',
		width: 50
	}];

	conf.rows = [];

	var wordsLength = words.length;
	for (var i = 1; i < wordsLength; i++) {
		conf.rows.push([words[i]]);
	}

	var result = nodeExcel.execute(conf);
	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	res.setHeader('Content-Disposition', 'attachment; filename=Random-Georgian-Words-' + wordsLength + '.xlsx');
	res.end(result, 'binary');
};

var exportTxt = function (res, words) {
	var text = "",
		wordsLength = words.length;
	for (var i = 0; i < wordsLength; i++) {
		text = text + words[i];
		text = text + (i === wordsLength - 1 ? '' : '\r\n');
	}
	res.setHeader('Content-type', 'application/octet-stream');
	res.setHeader('Content-disposition', 'attachment; filename=Random-Georgian-Words-' + wordsLength + '.txt');
	res.send(text);
};

module.exports.exportExcel = exportExcel;
module.exports.exportTxt = exportTxt;