// requires & globals
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ListingSchema = mongoose.Schema({
  price: Number,
  sqft: Number,
  city: String
});

var HouseSchema = mongoose.Schema({
  cost: Number,
  sqft: Number,
  city: String
});

var ApartmentSchema = mongoose.Schema({
  rent: Number,
  sqft: Number,
  city: String
});

var Listing = mongoose.model('Listing', ListingSchema);
var Apartment = mongoose.model('Apartment', ApartmentSchema, 'listings');
var House = mongoose.model('House', HouseSchema, 'listings');

router.get('/houses', function (req, res) {
  Listing.find({"cost": {$exists: true}}, function(err, allHouses) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allHouses);
  });
});

router.get('/apartments', function (req, res) {
  Listing.find({"rent": {$exists: true}}, function(err, allApts) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allApts);
  });
});

router.get('/:type/:key/:operator/:value', function (req, res) {
  var type = req.params.type;
  var value = parseInt(req.params.value);
  var operator = req.params.operator;
  var key = req.params.key;
  var query = {};
  if (operator === 'lte') {
    query[key] = {$lte: value};
  } else if (operator === 'gte') {
    query[key] = {$gte: value};
  }
  if (key === 'sqft') {
    if (type === 'apartments') {
      query['rent'] = {$exists: true};
    } else if (type === 'houses') {
      query['cost'] = {$exists: true};
    }
  }
  Listing.find(query, function(err, foundApts){
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(foundApts);
  });
});

router.post('/', function(req, res) {
  var listing;
  if (req.body.type === "houses") {
    listing = new House();
    listing.city = req.body.city;
    listing.sqft = req.body.sqft;
    listing.cost = req.body.price;
  } else if (req.body.type === "apartments") {
    listing = new Apartment();
    listing.city = req.body.city;
    listing.sqft = req.body.sqft;
    listing.rent = req.body.price;
  }
  listing.save(function(err, savedListing) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(savedListing);
  });

});

module.exports = router;
