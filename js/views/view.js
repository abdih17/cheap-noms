'use strict';
var obj = {cuisine: [new Opt('chinese'), new Opt('korean'), new Opt('indian')]};

function Opt(cuisine){
  this.cuisine = cuisine;
  this.toHTML = function(){
    var template = $('#submissionFormTemplate').html();
    var compile = Handlebars.compile(template);
    return compile(this);
  };
};

obj.cuisine.forEach(function(cuisineOption){
  $('.cuisineSelector').append(cuisineOption.toHTML());
});
function myMap(){
  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: new google.maps.LatLng(51.5, -0.2),
    zoom: 10
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);
}

myMap();
