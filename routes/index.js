var express = require('express'),
	router = express.Router();
var generate = require('../lib/generate');
var exportFile = require('../lib/export');

var words = [];
var fileTypes = ['.txt', '.xlsx'];

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
router.get('/exportAs/:id', function (req, res) {
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
