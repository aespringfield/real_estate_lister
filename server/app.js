// requires & globals
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// connect to Mongo database
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/realestate';
var MongoDB = mongoose.connect(mongoURI).connection;

// set port--either one picked by Heroku or port 3000
app.set('port', process.env.PORT || 3000);

// uses
app.use(express.static('server/public', {
  index: 'views/index.html'
}));
app.use(bodyParser.urlencoded({extended: true}));

// spin up server
app.listen(app.get('port'), function(req, res) {
  console.log("Listening on port:", app.get('port'));
});
