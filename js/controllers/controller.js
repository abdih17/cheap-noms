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

$('form.submissionForm').on('keydown', function(e){
  if(e.target === $('form.submissionForm').children()[0] ||
  e.target === $('form.submissionForm').children()[1]){
    if(e.keyCode === 13){
      clickFunction();
      $('.mainSection').hide();
      $('#listSection').show();
    }
  }
});

var clickFunction = function () {
  var location = $('#locationInput').val();
  var term = $('#termInput').val();
  restaurantObj.requestRepos(location, term);
};
