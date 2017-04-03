$(document).ready(function() {
  console.log("ready!");
  init();
});

// sets up page
function init() {
  enable(true);
}

// event listeners
function enable(value) {
  if (value) {
    $('.newListing').on('submit', submitForm);
    $('.searchListings').on('submit', submitForm);
    $('#searchBtn').on('click', showSearch);
    $('#listBtn').on('click', showAddListing);
    $('.viewButtons').on('click', '.apartments', displayListings);
    $('.viewButtons').on('click', '.houses', displayListings);
  } else {
    $('.newListing').off('submit', submitForm);
    $('.searchListings').off('submit', submitForm);
    $('#searchBtn').off('click', showSearch);
    $('#listBtn').off('click', showAddListing);
    $('.viewButtons').off('click', '.apartments', displayListings);
    $('.viewButtons').off('click', '.houses', displayListings);
  }
}

function displayListings() {
  var $el = $(this);
  var typeToShow = $el.data('listingtype');
  getListings(typeToShow);
}

function showSearch() {
  console.log("click");
  $('.addListing').addClass('hidden');
  $('.searchDiv').removeClass('hidden');
}

function showAddListing() {
  $('.searchDiv').addClass('hidden');
  $('.addListing').removeClass('hidden');
}

// submits newListing form
function submitForm(event) {
  event.preventDefault();
  $form = $(this);
  if ($form.data('formname') === "newListing") {
    var listingObj = createListingObj($form);
    postNewListing(listingObj);
  } else if ($form.data('formname') === "searchListings") {
    console.log("searching");
    var searchObj = createSearchURL($form);
    getSearchResults(searchObj);
  }
}

function createSearchURL($form) {
  var type = $form.find('.typeInput').val();
  var criterion = $form.find('.criterionInput').val();
  var operator = $form.find('.operatorInput').val();
  var value = $form.find('.valueInput').val();
  var key;
  if (criterion === 'sqft') {
    key = criterion;
  } else if (criterion === 'price') {
    key = indicateCostOrRent(type);
  }
  var url= '/listings/' + type + '/' + key + '/' + operator + '/' + value;
  return {type: type, url: url};
}

function getSearchResults(searchObj) {
  console.log(searchObj.url);
  console.log(searchObj.type);
  $.ajax({
    type: 'GET',
    url: searchObj.url,
    success: function(res) {
      console.log(res);
      appendToDOM(res, searchObj.type);
    }
  });
}

function createListingObj($form) {
  var city = $form.find('.cityInput').val();
  var sqft = $form.find('.sqftInput').val();
  var price = $form.find('.priceInput').val();
  var type = $form.find('.typeInput').val();
  // var priceKey = indicateCostOrRent(type);
  var listingObj = {
    city: city,
    sqft: sqft,
    type: type,
    price: price,
  };
  // listingObj[priceKey] = price;
  return listingObj;
}

// sends AJAX post request to add listing to database
function postNewListing(listingObj) {
  var type = listingObj.type;
  console.log(listingObj);
  $.ajax({
    type: 'POST',
    url: '/listings',
    data: listingObj,
    success: function(res) {
      console.log("SUCCESS! Response is", res);

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
  var $el = $('.listings').find('.' + type).find('.display');
  $el.empty();
  for (var i = 0; i < listingsArray.length; i++) {
    var listing = listingsArray[i];
    var listingEl = createListingEl(listing, type);
    $el.append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>');
    $el.children().last().append(listingEl);
  }
  console.log("type",type);
  showToggle(type);
}

// takes a listing and a type ("houses" or "apartments") and creates an HTML element
function createListingEl(listing, type) {
    var priceKey = indicateCostOrRent(type);
    var city = listing.city;
    var price = listing[priceKey];
    var sqft = listing.sqft;
    var listingEl = '<div class="listing">' +
              '<div><b>City:</b> ' + city + '</div>' +
              '<div><b>Square footage:</b> ' + sqft + '</div>' +
              '<div><b>' + capitalize(priceKey) + ':</b> ' + price + '</div>' +
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

// show a real estate type
function showToggle(type) {
  $('.listings').children().addClass('hidden');
  var $el = $('.listings').find('.' + type);
  $el.removeClass('hidden');
}
