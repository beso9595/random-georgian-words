var nodeExcel = require('excel-export');

var exportExcel = function (res, words) {
	var conf = {
		name: "Random-Georgian-Words"
	};

	conf.cols = [{
		caption: 'WORDS',
		type: 'string',
		width: 50
	}];

	conf.rows = [];

	for (var i = 0; i < words.length; i++) {
		let row = [words[i]];
		conf.rows.push(row);
	}

	var result = nodeExcel.execute(conf);
	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	res.setHeader("Content-Disposition", "attachment; filename=Random-Georgian-Words.xlsx");
	res.end(result, 'binary');
};

var exportTxt = function (res, words) {
	var text = "";
	for (var i = 0; i < words.length; i++) {
		text = text + words[i];
		text = text + (i === words.length - 1 ? '' : '\r\n');
	}
	res.setHeader('Content-type', "application/octet-stream");
	res.setHeader('Content-disposition', 'attachment; filename=Random-Georgian-Words.txt');
	res.send(text);
};

module.exports.exportExcel = exportExcel;
module.exports.exportTxt = exportTxt;