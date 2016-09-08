var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var path = require('path');

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

var listener = app.listen(port, function() {
	console.log("Frontend server listening on port " + listener.address().port);
});
