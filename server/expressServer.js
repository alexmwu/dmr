var express = require('express');
var app = express();
var api = require('./routes/api');

app.use('/',root);

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host,port);
});
