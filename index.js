// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function (req, res) {
  let date_string = req.params.date;
  let date = null;
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(date_string))
    date = new Date(date_string);
  else if (/^\d+$/.test(date_string))
    date = new Date(parseInt(date_string));
  else if (date_string == undefined)
    date = new Date();

  res.json(date ? {
    unix: Math.floor(date.getTime()),
    utc: date.toUTCString()
  } : {
    error: 'Invalid Date'
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
