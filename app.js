const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('./models/book')
const Book = mongoose.model('Book')

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect('mongodb://localhost/letters', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected!")
}).catch((err) => {
    console.log("There's something wrong!" + err)
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Request-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})

app.post('/register-book', (req, res) => {
    Book.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error! there's something wrong!"
        })
    })
    return res.json({
        error: false,
        message: "Book was registered with success!"
    })
})

app.get('/book-unity', (req, res) => {
    Book.findOne({}).then((book) => {
        return res.json(book)
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: 'Book not found'
        })
    })
})

app.get('/book-list', (req, res) => {
    Book.find({}).then((books) => {
        return res.json(books)
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: 'Book not found'
        })
    })
})

app.post('/search-book', (req, res) => {
    book = req.body.name
    Book.find({"name": {$regex: '.*' + book + ".*"}}).then((books) => {
        return res.json(books)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: 'Book not found'
        })
    })
    console.log(book)

})

app.listen(8000, () => {
    console.log("Server was running in: http://localhost:8000")
})
