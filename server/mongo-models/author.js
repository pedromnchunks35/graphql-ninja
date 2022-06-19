/* REQUIRE MONGOOSE */
const mongoose = require('mongoose');
/* SCHEMA */
const Schema = mongoose.Schema;
/* AUTHOR SCHEMA */
const authorSchema = new Schema({
name: String,
age: Number
});
/* EXPORT IT */
module.exports.author_model= mongoose.model('Author',authorSchema);