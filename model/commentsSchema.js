const credentials = require('./../credentials');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
	author: String, //should be a user
	topicId: String, //this will be topic ID
	text: String,
	netScore: Number
}, {collection: 'Comments'});

module.exports = mongoose.model('Comments', commentsSchema);