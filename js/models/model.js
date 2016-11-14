(function(module) {
  var restaurantObj = {};

  restaurantObj.requestRepos = function(callback) {
    $.when(
      $.get('https://api.yelp.com/v3/businesses/search', function(data) {
        restaurantObj.allRepos = data;
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
