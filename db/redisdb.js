var config = require('../config/config');
var redis = require("redis"),
	client = redis.createClient({
		host: config.dbHost,
		port: config.dbPort
	});

// client = redis.createClient();

client.auth(config.dbPassword, function (err) {
	if (err) {
		throw err;
	} else {
		console.log('Successfully Authenticated');
	}
});

client.on('connect', function () {
	console.log('Redis Connected!!');
});

client.on('error', function (err) {
	console.log('Error ' + err);
});

module.exports = client;