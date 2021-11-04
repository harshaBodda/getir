var express = require("express");
var http = require('http')
var app = express();
var cors = require('cors')

const config = require('./config.js');
var fetchController = require('./controllers/recordController');
var errorHandlers = require('./errorHandlers');

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

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/records", fetchController.fetchRecords);

app.use(errorHandlers.errorLogger)
app.use(errorHandlers.errorResponder)
app.use(errorHandlers.failSafeHandler)

http.createServer(app).listen(config.server.port);



module.exports = app


