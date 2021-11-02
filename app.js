var express = require("express");
var http = require('http')
const config = require('./config.js');
var app = express();
const mongoose = require("mongoose");
const recordModel = require("./models");
var bodyParser = require('body-parser');
var cors = require('cors')

mongoose.connect(
   `mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//app.use(cors())		//to enable cross-origin requests for angular
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

app.post("/records", async (request, response) => {

    if( !request.body.hasOwnProperty("startDate") || !request.body.hasOwnProperty("endDate") || !request.body.hasOwnProperty("minCount") || !request.body.hasOwnProperty("maxCount")){
        return response.send({
            "code" : 1,
            "msg" : "Failure",
            "error" : "Missing Required Parameters / Bad Request"
        }).status(400)
    }

    let startDate = request.body.startDate
    let endDate = request.body.endDate
    let minCount = request.body.minCount
    let maxCount = request.body.maxCount
    
    try {
    const users = await recordModel.aggregate([

        // step 1  : filter the collection bases on dates
        {
            "$match" : { 
                "createdAt": { $lte : new Date(endDate), $gte : new Date(startDate)},
            }
        },
        // step 2 : find the total records of each key
        {
            "$project" : {
                "_id" : 0,
                "key" : "$key",
                "createdAt" : "$createdAt",
                "totalCount": { $sum : "$counts" },
            }
        },
        // step 3 : filter the docs using max and min count
        {
            "$match" : {
                "totalCount" : { $lt : maxCount, $gt : minCount}
            }
        }

    ]);
  
    return response.send({
          "code" : 0,
          "msg" : "Success",
          "records" : users
      }).status(200);
    } catch (error) {
        return response.send({
            "code" : 1,
            "msg" : "Failure",
            "error" : error
        }).status(500);
    }
  });


const httpsserver = http.createServer(app).listen(config.server.port);



