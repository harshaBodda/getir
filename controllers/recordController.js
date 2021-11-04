const recordModel = require("../models");

module.exports.fetchRecords = async function(request,response,next){
    try{
        if( !request.body.hasOwnProperty("startDate") || !request.body.hasOwnProperty("endDate") || !request.body.hasOwnProperty("minCount") || !request.body.hasOwnProperty("maxCount")){
            return response.status(400).send({
                "code" : 1,
                "msg" : "Failure",
                "error" : "Missing Required Parameters / Bad Request"
            })
        }

        let body = {
            startDate : request.body.startDate,
            endDate : request.body.endDate,
            minCount : request.body.minCount,
            maxCount : request.body.maxCount
        }
    
        let resp = await fetchRecordsFunction(body)
        if(resp.code == 0){
            return response.status(200).send(resp); 
        } else{
            return response.status(500).send(resp); 
        }
    } catch(err){
        err => next(err)
    }
}


var fetchRecordsFunction = module.exports.fetchRecordsFunction = async function(body){
    try {
        const users = await recordModel.aggregate([
    
            // step 1  : filter the collection bases on dates
            {
                "$match" : { 
                    "createdAt": { $lte : new Date(body.endDate), $gte : new Date(body.startDate)},
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
                    "totalCount" : { $lt : body.maxCount, $gt : body.minCount}
                }
            }
    
        ]);
        
        return {
              "code" : 0,
              "msg" : "Success",
              "records" : users
          }
        
        } catch (error) {
            return {
                "code" : 1,
                "msg" : "Failure",
                "error" : error
            }
        }
}


