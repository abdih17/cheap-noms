'use strict';

$('#listButton').on('click', function(e) {
  clickFunction();
  $('.mainSection').hide();
  $('#listSection').show();
});

$('#mapButton').on('click', function(e) {
  clickFunction();
  $('.mainSection').hide();
  $('#mapSection').show();
});

var clickFunction = function () {
  obj.results = [];
  $('#results').empty();
  var location = $('#locationInput').val();
  var term = $('#termInput').val();
  restaurantObj.requestRepos(location, term);
};
