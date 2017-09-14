var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index');
});

/* POST generate random word. */
router.post('/', function (req, res) {
	var randomWordServiceUrl = 'http://watchout4snakes.com/wo4snakes/Random/RandomWord',
		translateWordServiceUrl = 'https://www.translate.com/translator/ajax_translate';

	var randomWord = generate(randomWordServiceUrl, translateWordServiceUrl, function(randomWord){
		res.render('index', {
			title: 'Title',
			randomWord: randomWord
		});
	});

});

function generate(randomWordServiceUrl, translateWordServiceUrl, next) {
	request.post(randomWordServiceUrl, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			request.post(translateWordServiceUrl, {
					form: {
						text_to_translate: body,
						source_lang: 'en',
						translated_lang: 'ka'
					}
				},
				function (error, response, body) {
					if (!error && response.statusCode === 200) {
						var parsedBody = JSON.parse(body);
						var translatedWord = parsedBody['translated_text'];
						return next(translatedWord);
					} else {
						console.log('another try of translate');
						return generate(randomWordServiceUrl, translateWordServiceUrl);
					}
				}
			);
		} else {
			console.log('another try of generate');
			return generate(randomWordServiceUrl, translateWordServiceUrl);
		}
	});
}

function asd(a,b,next){
	//..
	//..
	next();
}

module.exports = router;
