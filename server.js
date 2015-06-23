'use strict';
var express    = require('express'),
    exphbs     = require('express-handlebars'),
    http       = require('http'),
    mongoose   = require('mongoose'),
    twitter    = require('nTwitter'),
    routes     = require('./routes'),
    config     = require('./config'),
    streamHandler = require('/utils/streamHandler');

// Create express
var app = express();
var port = process.env.PORT || 3000;

// Set teh views engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/react-tweets');

// Create a new ntwitter instance
var twit = new twitter(config.twitter);

app.get('/', routes.index);


app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
 app.use("/", express.static(__dirname + "/public/"));



// // Fire it up (start our server)
var server = http.createServer(app).listen(port, function() {
   console.log('Express server listening on port ' + port);
});

// Initialize socket.io instance
var io =  require('socket.io').listen(server);

// Set twitter steaming
twit.stream('status/filter', { track: 'chicago'}, function (stream){
  streamHandler(stream, io);
});


