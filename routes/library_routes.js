'use strict';

const express = require('express');
const router = express.Router();

let books = [];

// book search
router.get('/books', (req, res, next) => {
    const title = req.query.title;
    const author = req.query.author;

    if (!title && !author) {
        res.json(books);
    } else {

        let foundBook = [];
        for (let book of books) {
            if (title && book.title.includes(title)) {
                foundBook.push(book);
            }
            if (author && book.author.includes(author)) {
                foundBook.push(book);
            }
        }
        if (foundBook.length > 0) {
            res.json(foundBook);

        } else {
            res.json({msg: 'No books found'});
        }
    }


});

// Add book to inventory
router.post('/books/', (req, res, next) => {
    const newBook = req.body;
    let isAvailable = false;
    for (let book of books) {
        if (book.title === newBook.title && book.author === newBook.author) {
            book.quantity += 1;
            isAvailable = true;
        }
    }
    if (isAvailable === false) {
        newBook.quantity = 1;
        books.push(newBook);
    }
    res.json({msg: 'Book added to the library'});

});

module.exports = router;