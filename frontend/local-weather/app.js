// import modules
var express = require('express');
var request = require('request');
var path = require('path');

// get api key
require('dotenv').config();
var apikey = process.env.WEATHER_ID;

// define port
var port = 3000;

// create our app
var app = express();

// set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// start server
app.listen(port, function() {
  console.log("Weather app listening on port " + port + "!");
});

// handle get requests to homepage
app.get('/', function(req, res) {
  res.render('homepage', {
    loc: "Harrisburg",
    temp: 45,
    desc: "raining cats and dogs",
    humidity: '-45',
    wind: 5,
    icon_url: "assets/04d.png"
  });

  app.get('/assets/:which', function(req, res) {
    res.sendFile(path.join(__dirname, 'assets', req.params.which));
  });
  /*
  // make get request for user's location
  request("https://freegeoip.net/json/" + req.ip, function(error, response, body) {
    if (error) {
      console.log(error);
      res.send("Oops! Couldn't get your location!");
    }
    else {
      body = JSON.parse(body);
      if (!body.longitude || !body.latitude) {
        console.log("I'm missing longitude and/or latitude");
        res.send("I don't know where you are!");
      }
      else {
        request("http://api.openweathermap.org/data/2.5/weather?lat=" + body.latitude + "&lon=" + body.longitude + "&APPID=" + apikey, function(error, response, body) {
          if (error) {
            console.log(error);
            res.send("Couldn't get the weather...maybe try looking out a window?");
          }
          else {
            body = JSON.parse(body);
            if (body.cod != 200) {
              console.log(body.cod + ": " + body.message);
            }
            else {
              res.send("Here's the weather: " + JSON.stringify(body));
            }
          }
        });
      }
    }
  });
  */
});
