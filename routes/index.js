var express = require('express'),
	router = express.Router();
var generate = require('../lib/generate');
var exportFile = require('../lib/export');

var words = [];

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index');
});

/* POST generate random word(s). */
router.post('/generate', function (req, res) {
	var params = req.body;
	generate.getWords(params['quantity'], function (randomWords) {
		words = randomWords;
		res.send({
			randomWords: randomWords
		});
	});
});

/* GET export random words. */
router.get('/exportExcel', function (req, res) {
	//TODO, use variable words
	var result = exportFile.exportExcel(words);
	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Random-Georgian-Words.xlsx");
    res.end(result, 'binary');
});

router.get('/exportTxt', function (req, res) {
	var text=exportFile.exportTxt(words);
	res.setHeader('Content-type', "application/octet-stream");
	res.setHeader('Content-disposition', 'attachment; filename=file.txt');
	res.send(text);
});

module.exports = router;
