'use strict';
var obj = {results: []};

var markers = [];

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
    zoom: 15
  });
  markers = [];
  markers = obj.results.map(function(result){
    var marker = new google.maps.Marker({
      position: {lat: result.coordinates.lat, lng: result.coordinates.lng},
      title: result.name + ' ' + result.address1 + ' ' + result.is_closed
    });
    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
      content: marker.title
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
    return marker;
  });
  var bounds = new google.maps.LatLngBounds();
  markers.forEach( function (marker){
    bounds.extend(marker.getPosition());
  });
  map.fitBounds(bounds);
}

initMap();
