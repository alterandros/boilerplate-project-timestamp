// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Add dayjs library for validation of date format
const dayjs = require('dayjs');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// #1 Get the user input date
app.get("/api/:date", function(req, res) {
  // #2 Extract the date from the user input
  let date = req.params.date;
  let unix;
  // #3 Check if date input is number or date format string
  if(isNaN(date)) {
    // not a number then...
    if(dayjs(date).isValid()) {
      // #4 Check if it is a valid date format
      let newDate = new Date(date).toUTCString();
      unix = Date.parse(newDate);
      res.json({unix: unix, utc: newDate});
      return;
      // #5 If not a number or valid date return error
    } else {
      res.json({error: "Invalid Date"});
      return;
    }
  } else {
    // #6 Convert number to date
    unix = parseInt(date);
    let newDate = new Date(Number(date)).toUTCString();
    res.json({unix: unix, utc: newDate});
    return;
  }
  });

// #7 Get user input if no date is provided
app.get("/api/", function(req, res) {
    let unix = Date.now();
    let date = new Date(unix).toUTCString();
    res.json({unix: unix, utc: date});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
