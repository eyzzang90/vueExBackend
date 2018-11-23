const express = require('express');
const router = express.Router();
const books = require('../books');

router.get('/', function(req, res, next){
    res.send(books);
});

router.get('/:id', function(req, res, next){
    let id = parseInt(req.params.id, 10);
    let book = books.filter(function(book){
        return book.id === id;
    });
    res.send(book);
});

module.exports = router;