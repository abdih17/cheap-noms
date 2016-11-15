'use strict';

$('#listButton').on('click', function(e) {
  restaurantObj.requestRepos();
  $('.mainSection').hide();
  $('#listSection').show();
});

$('#mapButton').on('click', function(e) {
  restaurantObj.requestRepos();
  $('.mainSection').hide();
  $('#mapSection').show();
});
