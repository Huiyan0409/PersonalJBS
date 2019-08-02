'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//var userSchema = mongoose.Schema( {any:{}})

var tutorSchema = Schema( {
  userId: ObjectId,
  userName: String,
  introduction: String,
  salary: Number,
  createdAt: Date,
  subject: String,
  email: String
} );

module.exports = mongoose.model( 'Tutor', tutorSchema );
