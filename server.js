var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var _ = require('lodash');
var schedule = require('node-schedule');
var fs = require('fs');
var crypto = require('crypto');
var mysql = require('mysql');
//var mysqlConfig = JSON.parse(fs.readFileSync('./config/mysqlConfig.json', 'utf8'));
//var sql = mysql.createConnection(mysqlConfig);

var tools = require('./repository/tools.js');

// sql.connect(function (err) {
// 	console.log("Database connection established.");
// 	if (err) {
// 		console.log(err);
// 	}
// });

var app = express();
var port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

app.post('/test', function (req, res) {
	//var postParam = req.body.postParam;
	// var req.get("custom-header-name");
	res.sendStatus(200);
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function () {
	console.log("Server running on port " + port + ".");
});