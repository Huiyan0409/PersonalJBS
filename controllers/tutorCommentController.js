'use strict';
const TutorComment = require( '../models/tutorComment' );

exports.saveTutorComment = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  console.log('body = ')
  console.dir(req.body)
  let newTutorComment = new TutorComment( {
    tutorName: req.body.tutorName,
    tuteeName: req.body.tuteeName,
    score: req.body.inlineRadioOptions,
    comment: req.body.comment,
  } )


  newTutorComment.save()
    .then( () => {
      //console.log("saving the comment")
      res.redirect( '/showtutorComment' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getAllTutorComments = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  TutorComment.find()
    .exec()
    .then( ( tutorComments ) => {
      //console.log('found skills')
      //console.dir(tutorComments)

      res.render( 'tutorComments', {
        tutorComments: tutorComments,title:"tutorComments"
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
  };
    // this displays all of the skills
exports.getOneTutorComment = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  TutorComment.findOne({_id:id})
    .exec()
    .then( ( tutorSingleComment ) => {
      res.render( 'tutorSingleComment', {
        tutorSingleComment:tutorSingleComment, title:"tutorSingleComment"
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
