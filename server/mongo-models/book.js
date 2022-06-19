/* REQUIRE MONGOOSE */
const mongoose = require('mongoose');
/* SCHEMA */
const Schema = mongoose.Schema;
/* BOOK SCHEMA */
const bookSchema = new Schema({
name: String,
genre: String,
authorId: String
});
/* EXPORT IT */
module.exports.book_model= mongoose.model('Book',bookSchema);