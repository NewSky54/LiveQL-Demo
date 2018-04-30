const credentials = require('./../credentials');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
	topic: String,
	comments: Array, // needs to be array of all the comments
}, {collection: 'Topics'});

module.exports = mongoose.model('Topics', topicSchema);