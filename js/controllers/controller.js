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
  $('#listSection').show();
  var results = document.getElementById('results');
  results.style.top = '600px';
};

$('#listButton').on('click', function(e) {
  var cont = clickFunction();
  resultsController.revealList();
  console.log(resultsController);
});

$('#mapButton').on('click', function(e) {
  var cont = clickFunction();
  if(cont){
    resultsController.revealMap();
  }
});

$('#apocalypseButton').on('click', function(e){
  location.reload();
});

$('form.submissionForm').on('keydown', function(e){
  if(e.target === $('form.submissionForm').children()[0] ||
  e.target === $('form.submissionForm').children()[1]){
    if(e.keyCode === 13){
      e.preventDefault();
      var cont = clickFunction();
      if(cont){
        resultsController.revealList();
      }
    }
  }
});

var clickFunction = function () {
  var location = $('#locationInput').val();
  var term = $('#termInput').val();
  var cont = restaurantObj.requestRepos(location, term);
  if(cont){
    var body = document.getElementById('body');
    body.style.overflow = 'visible';
    return true;
  }
  else return false;
};
