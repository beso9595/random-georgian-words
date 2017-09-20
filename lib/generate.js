var redis = require('../db/redisdb');
var config = require('../config/config');

var getWords = function (quantity, next) {
	quantity = quantity ? ((quantity < config.minWords || quantity > config.maxWords) ? config.minWords : quantity) : config.minWords;
	redis.get((config.dbPre + 'index'), function (err, index) {
		if (!err && index) {
			if (quantity <= index) {
				getRandomIndexes(quantity, index, function (randomIndexes) {
					getRandomWords(randomIndexes, function (randomWords) {
						next(randomWords);
					})
				})
			}
		}
	});
};

var getRandomIndexes = function (quantity, limit, next) {
	var randomIndexes = [];
	while (quantity > 0) {
		var i = Math.floor(Math.random() * (limit - 1)) + 1;
		if (!randomIndexes.includes(i)) {
			randomIndexes.push(i);
			quantity--;
		}
	}
	next(randomIndexes);
};

var getRandomWords = function (randomIndexes, next) {
	var randomWords = [],
		lastIndex = randomIndexes.length - 1;
	randomIndexes.forEach(function (index, i) {
		redis.hget((config.dbPre + 'words'), index, function (err, word) {
			if (!err && word) {
				randomWords.push(word);
				if (i >= lastIndex) {
					next(randomWords);
				}
			}
		});
	});
};

module.exports.getWords = getWords;
module.exports.getRandomIndexes = getRandomIndexes;
module.exports.getRandomWords = getRandomWords;