var express = require('express');
var app = express();
var port = process.env.port || 80;
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(morgan('dev')); // Server log to console
app.use(bodyParser.json()); // Parse post request as JSON
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(express.static(__dirname + '/public'));
app.use('/', router);
require('./config/routing.js')(router);

app.listen(port);
console.log('Listening on port: ' + port);
