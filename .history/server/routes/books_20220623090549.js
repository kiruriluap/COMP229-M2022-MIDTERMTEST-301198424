/**
Project name: Book_list_CRUD_project
File name: books.js
Function: route
Created by: Paul Kamau
**/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let body = require('body-parser')

// define the book model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res) => {
  // find all books in the books collection
  Book.find({}, (err,books) => {
    if(err){
      return res.send('-1')//server error
    }
    return res.render('./books/index', {
      title:'booklist',
      books:books
    })
  })

});




module.exports = router;
