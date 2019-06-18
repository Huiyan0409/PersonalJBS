'use strict';
const TuteeComment = require( '../models/tuteeComment' );

exports.saveTuteeComment = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  console.log('body = ')
  console.dir(req.body)
  let newTuteeComment = new TuteeComment( {
    tuteeName: req.body.tuteeName1,
    tutorName: req.body.tutorName1,
    studentScore: req.body.inlineRadioOptionsStudent,
    parentScore: req.body.inlineRadioOptionsParent,
    comment: req.body.comment1,
  } )


  newTuteeComment.save()
    .then( () => {
      //console.log("saving the comment")
      res.redirect( '/showtuteeComment' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getAllTuteeComments = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  TuteeComment.find()
    .exec()
    .then( ( tuteeComments ) => {
      //console.log('found skills')
      //console.dir(tutorComments)

      res.render( 'tuteeComments', {
        tuteeComments: tuteeComments,title:"tuteeComments"
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

    exports.getOneTuteeComment = ( req, res ) => {
      //gconsle.log('in getAllSkills')
      const id = req.params.id
      console.log('the id is '+id)
      TuteeComment.findOne({_id:id})
        .exec()
        .then( ( tuteeSingleComment ) => {
          res.render( 'tuteeSingleComment', {
            tuteeSingleComment:tuteeSingleComment, title:"tuteeSingleComment"
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
