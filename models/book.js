const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    pages: Number,
    synopsis: String,
    image: String,
    edition: Number,
    language: String,
    avaiable: Boolean,
    price: Number
})

const Book = mongoose.model('Book', bookSchema)
