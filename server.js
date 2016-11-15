var express = require('express'),
  requestProxy  = require('express-request-proxy'),
  port = process.env.PORT || 3000;
app = express();

var proxyYelp = function(request, response) {
  console.log('Routing Yelp request for ', request.params[0]);
  (requestProxy({
    url: 'https://api.yelp.com/' + request.params[0],
    headers: {'Authorization': 'Bearer ' + process.env.YELP_TOKEN}
  }))(request, response);
  console.log(response);
};

app.get('/yelp/*', proxyYelp);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
