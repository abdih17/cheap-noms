var express = require('express'),
  requestProxy  = require('express-request-proxy'),
  port = process.env.PORT || 3000;
app = express();
var Yelp = require('yelp');


var yelp =  new Yelp({
  consumer_key: '9E6cwhqhNS9hqyjz3rVmYA',
  consumer_secret: 'indNZu6wZIUHEw6UHXxxQyj5p-E',
  token: '85G1yFdc7ROqfZvotaDF-bljbcfYurZ6',
  token_secret: 'X2P3pnSUMfEY3kkOjkf2SCC8by8',
});

yelp.search({
  term: 'coffee',
  location:'98117',
  radius: 3218,
  categories: 'coffee',
  price: '1'
})
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });
// var proxyYelp = function(request, response) {
//   console.log('Routing Yelp request for ', request.params[0]);
//   (requestProxy({
//     url: 'https://api.yelp.com/v3/businesses/search?term=coffee&location=98117&radius=3218&categories=coffee&price=1&open_now=true',
//     headers: {'Authorization': 'Bearer JjSqeSEGUZUgZOaO-zPkA84bWBTreYXUgnVrOhFbVRxKJvDpfNgqiN9Hpdu6o7AqUO3qXXto2_5oCtXI2H7vohk9JAZpWBC9U7gpNHQpoCsVd1u5F6v-1hNkJAcmWHYx'}
//   }))(request, response);
// };

// app.get('yelp/*', proxyYelp);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
