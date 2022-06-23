/**
Project name: Book_list_CRUD_project
File name: books.js
Function: route
Created by: Cong Wang
Created on: Otc. 27 2020
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

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res) => {
  res.render('./books/addBook', {
        title: 'Books'
      })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res) => {
  let myBook = req.body

  Book.find({title: myBook.title}, (err, _book) => {
    if(err){
      return res.send('-1')//server error
    }
    if(_book.length === 0){
      //book not exist, can be saved
      Book.addBook(myBook, (data) =>{
        if(data==='1'){
          //1: book not exist, add successfully
          res.send('1')
        }else{
          //2: book exist, add failed
          res.send('0')
        }
      })
    }
  })
})

/*CHECKOUT check whether book exists based on book title*/
router.checkout('/:title', (req,res) => {
  Book.checkTitle(req.params.title, (book) => {
    if(book === '-1'){
      return res.send('-1') //server error
    }
    if(book){
      //true: not exist; 
      return res.send('1')
    }else{
      //false: exist
      return res.send('0')
    }
  })
})


// GET the Book Details page in order to edit an existing Book
router.get('/:title', (req, res, next) => {
    let title = req.params.title
    Book.find({title:title}, (err, books) => {
      if(err){
        return res.send('-1')//server error
      }
      if(books.length===0){
        //book not exist in db
        return res.send('no such book in your book list')
      }else{
        res.render('./books/details', {
          title: books[0].title,
          price: books[0].price,
          author: books[0].author,
          genre: books[0].genre,
          description: books[0].description
        })
      }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/:title', (req, res, next) => {
    let myBook = req.body
    Book.find({title:myBook.title}, (err, books) =>{
      if(err){
        return res.send('-1')//server error
      }

      if(books.length===0){
        //no such book in db
        return res.send('0')
      }

      books[0].price = myBook.price
      books[0].author = myBook.author
      books[0].genre = myBook.genre
      books[0].description = myBook.description

      books[0].save().then(()=>{
        return res.send('1')
      })
      
    })
})

// DELETE - process the delete by user id
router.delete('/:title', (req, res, next) => {
  let title = req.params.title
  Book.find({title:title}, (err, books) =>{
    if(err){
      return res.send('-1')
    }
    if(books.length===0){
      return res.send('0')
    }
    books[0].remove().then(()=>{
      return res.send('1')
    })
  })
});


module.exports = router;
