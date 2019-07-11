'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var recipeSchema = Schema( {
  name: String,
  ingredients: String,
  directions: String,
  author: String,
  createdAt: Date
} );

module.exports = mongoose.model( 'Recipe', recipeSchema );
