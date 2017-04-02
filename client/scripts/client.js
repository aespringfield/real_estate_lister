$(document).ready(function() {
  console.log("ready!");
  enable(true);
  getListings("houses");
  getListings("apartments");
});

// event listeners
function enable(value) {
  if (value) {
    $('.newListing').on('submit', submitForm);
  } else {
    $('.newListing').off('submit', submitForm);
  }
}

// submits newListing form
function submitForm(event) {
  event.preventDefault();
  $listingForm = $(this);
  var listingObj = createListingObj($listingForm);
  postNewListing(listingObj);
}

function createListingObj($listingForm) {
  var city = $listingForm.find('.cityInput').val();
  var sqft = $listingForm.find('.sqftInput').val();
  var price = $listingForm.find('.priceInput').val();
  var type = $listingForm.find('.typeInput').val();
  var priceKey = indicateCostOrRent(type);
  var listingObj = {
    city: city,
    sqft: sqft,
  };
  listingObj[priceKey] = price;
  return listingObj;
}

// sends AJAX post request to add listing to database
function postNewListing(listingObj) {
  console.log(listingObj);
  $.ajax({
    type: 'POST',
    url: '/listings',
    data: listingObj,
    success: function(res) {
      console.log("totes posted that ish");
    }
  });
}

// sends AJAX request to a specified type parameter--either "houses" or "apartments"
function getListings(type) {
  $.ajax({
    type: 'GET',
    url: '/listings/' + type,
    success: function(res) {
      console.log("Succesfully got:", res);
      appendToDOM(res, type);
    }
  });
}

// appends each item of an array of listings to the correct div on the document
// type parameter is either apartments or houses
function appendToDOM(listingsArray, type) {
  // var divClass = '.' + type;
  var $el = $('.' + type);
  for (var i = 0; i < listingsArray.length; i++) {
    var listing = listingsArray[i];
    var listingEl = createListingEl(listing, type);
    $el.append(listingEl);
  }
}

// takes a listing and a type ("houses" or "apartments") and creates an HTML element
function createListingEl(listing, type) {
    var priceKey = indicateCostOrRent(type);
    var city = listing.city;
    var price = listing[priceKey];
    var sqft = listing.sqft;
    var listingEl = '<div class="listing">' +
              '<p>City: ' + city + '</p>' +
              '<p>Square footage: ' + sqft + '</p>' +
              '<p>' + capitalize(priceKey) + ': ' + price + '</p>' +
              '</div>';
    return listingEl;
}

// takes a type of listing ("houses" or "apartments") and indicates whether
// they have pricing data stored under a key called "cost" or "rent"
function indicateCostOrRent(type) {
  var priceKey;
  switch (type) {
    case 'houses':
      priceKey = 'cost';
      break;
    case 'apartments':
      priceKey = 'rent';
      break;
  }
  return priceKey;
}

// takes a string and capitalizes the first letter
function capitalize(string) {
  var capString = string[0].toUpperCase() + string.slice(1);
  return capString;
}
