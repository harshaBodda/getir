require('../models'); //require in any models that you need to use in your tests
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true');
mongoose.connection.once('open',()=>{}).on('error',(err)=> 
{console.log(err)});