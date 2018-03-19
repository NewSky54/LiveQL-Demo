const credentials = require('./../credentials');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`mongodb://${credentials.dbUsername}:${credentials.dbPassword}@ds111791.mlab.com:11791/liveql-demo`);


var commentsSchema = new Schema({
	author: String, //should be a user
	topicId: String, //this will be topic ID
	text: String,
	netScore: Number
}, {collection: 'Comments'});

module.exports = mongoose.model('Comments', commentsSchema);