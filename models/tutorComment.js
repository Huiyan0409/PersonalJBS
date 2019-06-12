'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var tutorCommentSchema = Schema( {
  tutorName: String,
  tuteeName: String,
  score: Number,
  comment: String
} );

module.exports = mongoose.model( 'tutorComment', tutorCommentSchema );
