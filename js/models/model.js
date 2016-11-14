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
