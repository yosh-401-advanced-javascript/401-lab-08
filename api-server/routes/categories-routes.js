
const express = require('express');
const router = express.Router();



const Categories = require('../models/categories/categories.js');
const categories = new Categories();





//ROUTES
router.get('/categories', getCategories);
router.post('/categories', postCategories);
router.get('/categories/:id', getCategory);
router.put('/categories/:id', putCategories);
router.delete('/categories/:id', deleteCategories);


//HANDLERS
function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  categories.get()
  .then( data => {
    console.log('here');
    const output = {
      count: data.length,
      results: data,
    };
    response.status(200).json(output);
  })
  .catch( next );
}

function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get('/', request.params.id)
  .then( result => response.status(200).json(result) )
  .catch( next );
}

function postCategories(request,response,next) {
  // expects the record that was just added to the database
  categories.post(request.body)
  .then( result => response.status(200).json(result) )
  .catch( next );
}


function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
  .then( result => response.status(200).json(result) )
  .catch( next );
}

function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
  .then( result => response.status(200).json(result) )
  .catch( next );
}

module.exports = router;