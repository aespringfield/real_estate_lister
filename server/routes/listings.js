// requires & globals
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ListingSchema = mongoose.Schema({
  rent: Number,
  cost: Number,
  sqft: Number,
  city: String
});

var Listing = mongoose.model('Listing', ListingSchema);

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
  Listing.find({"rent": {$exists: true}},function(err, allApts) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allApts);
  });
});

router.post('/', function(req, res) {
  var listing = new Listing();
  console.log("request body", req.body);
  listing.city = req.body.city;
  listing.sqft = req.body.sqft;

  if (req.body.cost) {
    listing.cost = req.body.cost;
  } else if (req.body.rent) {
    listing.rent = req.body.rent;
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
