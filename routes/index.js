var express = require('express');
var router = express.Router();

var redis = require("redis"),
	client = redis.createClient();

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index');
});

/* POST generate random word. */
router.post('/', function (req, res) {
	var params = req.body,
		quantity = params['quantity'] | 1,
		randomWords;
	if (params) {
		if (params['type']) {
			randomWords = getRandomWords(quantity);
		} else {
			var tps = ['n', 'a', 't', 'i', 'e', 'z', 's'],
				types = [];
			tps.forEach(function (t) {
				if (params['type_' + t]) {
					types.push(t);
				}
			});
			randomWords = getRandomWords(quantity, types);
		}
	}
	res.send({
		randomWords: randomWords
	})
});

function getRandomWords(quantity, types) {
	var generatedWords = [];
	if (types) {
		var tables = [];
		var typesWithQuantity = distribute(quantity, types);
		typesWithQuantity.forEach(function (twq, i) {
			generate(twq.quantity, twq.type, generatedWords);
		});
	} else {

	}
	return generatedWords;
}

function generate(quantity, type, generatedWords) {
	var pre = 'rgw_',
		randomNumbers = [],
		index;
	client.hget((pre + 'indexes'), type, function (err, typeIndex) {
		if (!err && typeIndex) {
			while (quantity-- > 0) {
				index = Math.floor(Math.random() * typeIndex) + 1;
				if (!randomNumbers.includes(index)) {
					randomNumbers.push(index);
				}
			}
			//TODO
		}
	});
}

function distribute(quantity, types) {
	var typesLength = types.length,
		distributed = [],
		chosen = [],
		index;
	if (quantity < typesLength) {
		while (chosen.length < quantity) {
			index = Math.floor(Math.random() * typesLength);
			if (!chosen.includes(types[index])) {
				chosen.push(types[index]);
			}
		}
		chosen.forEach(function (c) {
			distributed.push({
				type: c,
				quantity: 1
			});
		})
	} else if (quantity > typesLength) {
		var per = Math.floor(quantity / typesLength),
			extra = quantity % typesLength;
		while (chosen.length < extra) {
			index = Math.floor(Math.random() * typesLength);
			if (!chosen.includes(index)) {
				chosen.push(index);
			}
		}
		types.forEach(function (t, i) {
			distributed.push({
				type: t,
				quantity: per + (chosen.includes(i) ? 1 : 0)
			});
		});
	} else {
		types.forEach(function (t) {
			distributed.push({
				type: t,
				quantity: 1
			});
		});
	}
}

module.exports = router;
