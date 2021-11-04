const mongoose = require("mongoose");
const config = require('./config.js');

//var db;
dbConnection = async function(){
    await mongoose.connect(config.db.mongoURL);
    
    mongoose.connection.on("error", (err) => console.log("err", err));
    mongoose.connection.on("connected", () => console.log("Connected successfully"));
}
dbConnection();

module.exports = mongoose.connection;
