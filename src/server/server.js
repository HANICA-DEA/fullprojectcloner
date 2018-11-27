var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var cors = require('cors');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept');
  next()
});

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
});

app.post('/contacts', function (req, res) {
  console.log('creating the contacts');
  res.json(req.body)
});

app.listen(8080);
console.log('App listening on port 8080');
