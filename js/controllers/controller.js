'use strict';

$(document).ready(function(){
  $('#listSection, #mapSection').hide();
});

var resultsController = {};

resultsController.revealList = function(){
  $('.mainSection').hide();
  $('#listSection').show();
};

resultsController.revealMap = function(){
  $('.mainSection').hide();
  $('#mapSection').show();
};

$('#listButton').on('click', function(e) {
  clickFunction();
  resultsController.revealList();
  console.log(resultsController);
});

$('#mapButton').on('click', function(e) {
  clickFunction();
  resultsController.revealMap();
});

$('form.submissionForm').on('keydown', function(e){
  if(e.target === $('form.submissionForm').children()[0] ||
  e.target === $('form.submissionForm').children()[1]){
    if(e.keyCode === 13){
      e.preventDefault();
      clickFunction();
      resultsController.revealList();
    }
  }
});

var clickFunction = function () {
  var location = $('#locationInput').val();
  var term = $('#termInput').val();
  restaurantObj.requestRepos(location, term);
};
