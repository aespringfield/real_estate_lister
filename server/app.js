// requires & globals
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

// connect to Mongo database

// uses
app.use(express.static('server/public', {
  index: 'views/index.html'
}));
app.use(bodyParser.urlencoded({extended: true}));

// spin up server
app.listen(app.get('port'), function(req, res) {
  console.log("Listening on port:", app.get('port'));
});
