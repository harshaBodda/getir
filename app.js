var express = require("express");
var http = require('http')
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')

const config = require('./config.js');
var fetchController = require('./controllers/recordController');

app.options('*', cors());
// allow CORS 
//----------------------------------------------------------------
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, x_chord, y_chord, z_chord, d_chord');
    next();
};

app.use(allowCrossDomain);

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}))

app.post("/records", fetchController.fetchRecords);

http.createServer(app).listen(config.server.port);

module.exports = app

