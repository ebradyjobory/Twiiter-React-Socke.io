'use strict';
var mongoose = require('mongoose');

var TwitterSchema = new mongoose.Schema({
   twid        : String,
   active      : Boolean,
   author      : String,
   avatar      : String,
   body        : String,
   date        : Date,
   screennmae  : String
});

//When we have an application that not only renders server side, but has an active stream saving to the database behind the scenes, 
//we need to create a way to make sure that when we request our next page of tweets, 
//it takes into account that Tweets may have been added since the app has been running on the client.

TwitterSchema.statics.getTweets = function (page, skip, callback) {
  var tweets = [],
      start = (page * 10) + (skip * 1);

  Tweet.find({}, 'twid active author avatar body date screenname',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs){
     if(!err) {
        tweets = docs;  // We got tweets
        tweets.forEach(function(tweet){
 	  tweet.active = true; // Set them to active
	});
      }
      callback(tweets);
  });
};
