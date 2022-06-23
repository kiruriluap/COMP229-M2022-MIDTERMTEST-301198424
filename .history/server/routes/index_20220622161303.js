/**
Project name: Book_list_CRUD_project
File name: index.js
Function: route
Created by: Cong Wang
Created on: Otc. 27 2020
**/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
