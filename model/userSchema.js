const credentials = require('./../credentials');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`mongodb://${credentials.dbUsername}:${credentials.dbPassword}@ds111791.mlab.com:11791/liveql-demo`);


var usersSchema = new Schema({
	username:  String,
	password: String,
	comments: Array
}, {collection: 'Users'});

module.exports = mongoose.model('Users', usersSchema);