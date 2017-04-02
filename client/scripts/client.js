$(document).ready(function() {
  console.log("ready!");
  getListings("houses");
  getListings("apartments");
});

// event listeners
function enable(value) {
  if (value) {

  } else {

  }
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
    case "houses":
      priceKey = "cost";
      break;
    case "apartments":
      priceKey = "rent";
      break;
  }
  return priceKey;
}

// takes a string and capitalizes the first letter
function capitalize(string) {
  var capString = string[0].toUpperCase() + string.slice(1);
  return capString;
}
