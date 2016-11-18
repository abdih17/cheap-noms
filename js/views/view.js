'use strict';
var obj = {results: []};

var markers = [];
var maxReviewCount = 0;

function Opt(name, image_url, is_closed, location, url, coordinates, rating, distance, reviewCount, phone){
  this.displayIsClosed = function(isClosed){
    if(isClosed){
      return 'closed';
    }
    else{
      return 'Open now';
    }
  };
  this.displayPhone = function(){
    if(phone){
      return '(' + phone.slice(2, 5) + ') ' + phone.slice(5, 8) + '-' + phone.slice(8);
    }
    else return '';
  };
  this.displayCompactPhone = function(){
    if(phone){
      return 'tel:' + phone;
    }
  };
  this.name = name;
  this.coordinates = coordinates;
  this.image_url = image_url;
  this.is_closed = this.displayIsClosed(is_closed);
  this.address1 = location.address1;
  this.url = url;
  this.rating = rating;
  this.distance = distance;
  this.reviewCount = reviewCount;
  this.city = location.city;
  this.state = location.state;
  this.phone = this.displayPhone();
  this.compactPhone = this.displayCompactPhone();
  this.toHTML = function(){
    var template = $('#resultsTemplate').html();
    var compile = Handlebars.compile(template);
    return compile(this);
  };
};

function initMap(locationIndex){
  markers = [];
  markers = obj.results.map(function(result){
    var marker = new google.maps.Marker({
      position: {lat: result.coordinates.lat, lng: result.coordinates.lng},
      title: result.name,
      address: result.address1,
      is_closed: result.is_closed,
      rating: result.rating,
      distance: result.distance,
      reviewCount: result.reviewCount,
      phone: result.phone,
      compactPhone: result.compactPhone,
      chartObj: {
        type: 'bar',
        data: {
          labels: ['Rating', 'Popularity', 'Distance'],
          datasets: [{
            data: [2.5 * (result.rating - 3), 5 * Math.log(result.reviewCount) / Math.log(maxReviewCount), 5 - result.distance * 4 / 3218],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      }
    });
    if(marker.reviewCount > maxReviewCount){
      maxReviewCount = marker.reviewCount;
    }
    return marker;
  });
  if(typeof locationIndex === 'number'){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: markers[locationIndex].getPosition().lat(), lng: markers[locationIndex].getPosition().lng()}
    });
  }
  else{
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
    });
  };
  var bounds = new google.maps.LatLngBounds();
  markers.forEach(function(marker){
    marker.infowindow = new google.maps.InfoWindow({
      content: '<div>' + marker.title + '</div>'
    });

    google.maps.event.addListener(marker, 'click', function() {
      if(!marker.infowindow.isOpen){
        marker.ctx = $('#chart' + markers.indexOf(marker));
        marker.chart = new Chart(marker.ctx, marker.chartObj);
        marker.infowindow.content = '<div>' + marker.title + '</div>' +
          '<div>' + marker.address + '</div>' +
          '<a href="' + marker.compactPhone + '"><div>' + marker.phone + '</div></a>' +
          '<canvas class="infoChart" id="chart' + markers.indexOf(marker) + '"></canvas>';
        marker.infowindow.isOpen = true;
      }
      else{
        marker.infowindow.content = '<div>' + marker.title + '</div>';
        marker.infowindow.isOpen = false;
      }
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      marker.infowindow.open(map,marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
      if(!marker.infowindow.isOpen){
        marker.infowindow.close(map,marker);
      }
    });

    if(typeof locationIndex === 'number'){
      if(locationIndex === markers.indexOf(marker)){
        marker.setMap(map);
        map.setCenter(marker.getPosition());
      }
    }
    else{
      marker.setMap(map);
      bounds.extend(marker.getPosition());
    }
  });
  if(typeof locationIndex !== 'number'){
    map.fitBounds(bounds);
  }
  if(map.zoom > 15){
    map.zoom = 15;
  }
}

function myFunction() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

initMap();
