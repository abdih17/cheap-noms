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
