"use strict";

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/public/creative/index.html'));
});

app.use(express.static(__dirname + '/public'));

app.get('/t*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/public/transaction.html'));
});

app.get('/c*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/public/coupon.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

var listener = app.listen(port, function() {
	console.log("Frontend server listening on port " + listener.address().port);
});
