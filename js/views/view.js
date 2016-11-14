'use strict';
var obj = {results: []};

function Opt(name, image_url, is_closed, address1, url){
  this.name = name;
  this.image_url = image_url;
  this.is_closed = is_closed;
  this.address1 = address1;
  this.url = url;
  this.toHTML = function(){
    var template = $('#resultsTemplate').html();
    var compile = Handlebars.compile(template);
    return compile(this);
  };
};

function myMap(){
  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: new google.maps.LatLng(47.6, -122.3),
    zoom: 10
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
}

myMap();
