// requires & globals
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// routes
var listings = require('./routes/listings.js');
// connect to Mongo database
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/realestate';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on("error", function(err){
  console.log("Mongo Connection Error :", err);
});

//If we successfully hooked up to the database, let us know!
MongoDB.once("open", function(){
  console.log("Tots connected to Mongo, meow.");
});
// set port--either one picked by Heroku or port 3000
app.set('port', process.env.PORT || 3000);

// uses
app.use(express.static('server/public', {
  index: 'views/index.html'
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/listings', listings);

// spin up server
app.listen(app.get('port'), function(req, res) {
  console.log("Listening on port:", app.get('port'));
});
