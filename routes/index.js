var express = require('express'),
	router = express.Router();
var generate = require('../lib/generate');

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

/* POST export random words. */
router.post('/export', function (req, res) {
	var params = req.body,
		type = params['type'];
	//TODO, use variable words
	res.send({
		type: type,
		file: words
	})
});

module.exports = router;
