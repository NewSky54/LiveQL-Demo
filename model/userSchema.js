const credentials = require('./../credentials');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	username:  String,
	password: String, // Encrypt - bcrypt 
	comments: Array
}, {collection: 'Users'});

module.exports = mongoose.model('Users', usersSchema);