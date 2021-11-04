var config = {};


config.server = {};
config.server.port = process.env.PORT || 3000;

config.db = {}
config.db.mongoURL = process.env.DB_SRV || 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true'

module.exports = config;