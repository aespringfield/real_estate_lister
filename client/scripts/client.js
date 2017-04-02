$(document).ready(function() {
  console.log("ready!");
  getHouses();
  getApartments();
});

// event listeners
function enable(value) {
  if (value) {

  } else {

  }
}

function getHouses() {
  $.ajax({
    type: 'GET',
    url: '/listings/houses',
    success: function(res) {
      console.log(res);
    }
  });
}

function getApartments() {
  $.ajax({
    type: 'GET',
    url: '/listings/apartments',
    success: function(res) {
      console.log(res);
    }
  });
}
