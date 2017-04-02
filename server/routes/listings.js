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

console.log(Listing.find());

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

// router.post('/house', function(req, res) {
//
// });

module.exports = router;
