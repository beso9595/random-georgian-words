var express = require('express'),
	router = express.Router();
var generate = require('../lib/generate');
var exportFile = require('../lib/export');

var words = [];
// var fileTypes = ['.txt', '.xlsx'];

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index');
});

/* POST generate random word(s). */
router.get('/generate', function (req, res) {
	generate.getWords(req.query.quantity, function (randomWords) {
		words = randomWords;
		res.send({
			randomWords: randomWords
		});
	});
});

/* GET export random words. */
router.get('/export/:id', function (req, res) {
	var id = parseInt(req.params.id);
	switch (id) {
		case 1:
			var text = exportFile.exportTxt(res, words);
			break;
		case 2:
			var result = exportFile.exportExcel(res, words);
			break;
	}
});

module.exports = router;
