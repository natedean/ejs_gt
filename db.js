'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to database.'));

const userSchema = mongoose.Schema({
	_id: String,
	username: String,
	gcgScore: Number
});

db.User = mongoose.model('User', userSchema);

module.exports = db;