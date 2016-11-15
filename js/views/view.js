'use strict';
var obj = {results: []};

var coords = [];

function Opt(name, image_url, is_closed, location, url, coordinates){
  this.name = name;
  this.coordinates = coordinates;
  this.image_url = image_url;
  this.is_closed = is_closed;
  this.address1 = location.address1;
  this.url = url;
  this.toHTML = function(){
    var template = $('#resultsTemplate').html();
    var compile = Handlebars.compile(template);
    return compile(this);
  };
};

function initMap(location){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 4
  });

  obj.results.forEach(function(result){
    var marker = new google.maps.Marker({
      position: {lat: result.coordinates.lat, lng: result.coordinates.lng},
      title: results.name + ' ' + results.address1 + ' ' + results.is_closed
    });
    marker.setMap(map);
  });
}

initMap({lat: -25.363, lng: 131.044});
