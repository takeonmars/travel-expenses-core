require('rootpath')();
var path = require("path");
const logger = require('./middlewares/logger.js')
var express = require("express");
var app = express();

const Jwt = require('./_helpers/jwt.js');

const errorHandler = require('./_helpers/error-handlers');

app.use(logger.logger);

app.use(express.static(path.join(__dirname, 'public')));

// init db
let modelInitiator = require('./models/index');
modelInitiator.initDBStructure();

app.use(Jwt.jwt);

let TravelController = require('./controllers/TravelController');
app.use('/api/travel', TravelController);

app.use(errorHandler);

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
