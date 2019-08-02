'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//var userSchema = mongoose.Schema( {any:{}})

var tuteeSchema = Schema( {
  userId: ObjectId,
  userName: String,
  introduction: String,
  payment: Number,
  createdAt: Date,
  subject: String,
  email: String
} );

module.exports = mongoose.model( 'Tutee', tuteeSchema );
