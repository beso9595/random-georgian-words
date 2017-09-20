var nodeExcel = require('excel-export');

var exportExcel = function (words) {
    var conf = {
        name: "Random-Georgian-Words"
    };

    conf.cols = [
        {
            caption: '#',
            type: 'number',
            width: 10
        },
        {
            caption: 'WORD',
            type: 'string',
            width: 30
        }];

    conf.rows = [];

    for (var i = 0; i < words.length; i++) {
        let row = [i + 1, words[i]];
        conf.rows.push(row);
    }

    return nodeExcel.execute(conf);
}

var exportTxt = function (words) {
    var text = "";
    for (var i = 0; i < words.length; i++) {
        text = text + (i + 1) + '. ' + words[i];
        text = text + (i === words.length - 1 ? '' : ', \r\n');
    }

    return text;
}

module.exports.exportExcel = exportExcel;
module.exports.exportTxt = exportTxt;