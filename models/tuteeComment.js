'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var tuteeCommentSchema = Schema( {
  tuteeName: String,
  tutorName: String,
  studentScore: Number,
  parentScore: Number,
  comment: String
} );

module.exports = mongoose.model( 'tuteeComment', tuteeCommentSchema );
