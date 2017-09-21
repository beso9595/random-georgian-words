var nodeExcel = require('excel-export');

var exportExcel = function (words) {
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

	return nodeExcel.execute(conf);
};

var exportTxt = function (words) {
	var text = "";
	for (var i = 0; i < words.length; i++) {
		text = text + words[i];
		text = text + (i === words.length - 1 ? '' : '\n');
	}
	return text;
};

module.exports.exportExcel = exportExcel;
module.exports.exportTxt = exportTxt;