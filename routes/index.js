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

	generate(randomWordServiceUrl, translateWordServiceUrl, function (randomWord) {
		res.send({
			randomWord: randomWord
		})
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
						var parsedBody = JSON.parse(body),
							translatedWord = parsedBody['translated_text'];
						return validateWord(translatedWord) ? next(translatedWord) : generate(randomWordServiceUrl, translateWordServiceUrl);
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

function validateWord(randomWord) {
	return randomWord.match(/[a-z]/i) === null;
}

module.exports = router;
