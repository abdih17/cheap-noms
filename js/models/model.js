(function(module) {
  var restaurantObj = {};

  restaurantObj.requestRepos = function(location, term, callback) {
    $.when(
      $.get('/yelp/v3/businesses/search?term=' + term + '&location=' + location + '&radius=3218&categories=restaurants&price=1&is_closed=true', function(data) {
        restaurantObj.allRepos = data;
        restaurantObj.allRepos.businesses.forEach(function(options) {
          obj.results.push(new Opt(options.name, options.image_url, options.is_closed, options.address1, options.url));
        });
        console.log(restaurantObj.allRepos);
        obj.results.forEach(function(result){
          $('#results').append(result.toHTML());
        });
      })
    ).done(callback);
  };

  restaurantObj.withTheAttribute = function(attr) {
    return restaurantObj.allRepos.filter(function(aRepo) {
      return aRepo[attr];
    });
  };

  module.restaurantObj = restaurantObj;

})(window);
