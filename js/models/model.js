(function(module) {
  var restaurantObj = {};

  restaurantObj.requestRepos = function(location, term, callback) {
    if(!location){
      alert('You must enter a valid location.');
    }
    else{
      $.when(
        $.ajax({
          url: '/yelp/v3/businesses/search?term=' + term + '&location=' + location + '&radius=3218&categories=restaurants&price=1&is_closed=true&sort_by=rating&limit=20',
          type: 'GET',
          success: function(data) {
            data.businesses.forEach(function(business){
              if (3218 < business.distance) {
                data.businesses.splice(data.businesses.indexOf(business), 1);
              }
            });
            if(data.businesses.length){
              obj.results = [];
              $('#results').empty();

              restaurantObj.allRepos = data;
              restaurantObj.allRepos.businesses.forEach(function(options) {
                obj.results.push(new Opt(
                  options.name,
                  options.image_url,
                  options.is_closed,
                  options.location,
                  options.url,
                  {lat: options.coordinates.latitude, lng: options.coordinates.longitude},
                  options.rating,
                  options.distance,
                  options.review_count,
                  options.phone));
              });
              console.log(restaurantObj.allRepos);
              obj.results.forEach(function(result){
                $('#results').append(result.toHTML());
                $('#results li:last-child').find('.showMapButton').on('click', function(){
                  $('#mapSection').show();
                  initMap(obj.results.indexOf(result));
                });
              });
              initMap();
            }
            else{
              alert('no results!');
            }
          },
          error: function(data){
            alert('location is invalid.');
          }
        })
      ).done(callback);
    }
  };

  restaurantObj.withTheAttribute = function(attr) {
    return restaurantObj.allRepos.filter(function(aRepo) {
      return aRepo[attr];
    });
  };

  module.restaurantObj = restaurantObj;

})(window);
