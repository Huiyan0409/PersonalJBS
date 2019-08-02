'use strict';
const Tutor = require( '../models/tutor' );

exports.saveTutor = ( req, res ) => {
  const goBackURL = '/tutorRegister'
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to become a tutorRegister.")
  }
  let newTutor = new Tutor(
    {
      userId: res.locals.user._id,
      userName:res.locals.user.userName,
      introduction: req.body.introduction,
      salary: req.body.salary,
      createdAt: new Date(),
      subject: req.body.subject,
      email: req.body.email
    }
  )
  newTutor.save()
  .then( () => {
    res.redirect( '/showTutors');
  } )
  .catch( error => {
    res.send( error );
  } );
};

exports.getAllTutor = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Tutor.find({}).sort({score: -1})
    .exec()
    .then( ( tutors ) => {
      //console.log('found skills')
      //console.dir(tutorComments)

      res.render( 'showTutors', {
        tutors: tutors,title:"tutors"
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
exports.getOneTutor = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  Tutor.findOne({_id:id})
    .exec()
    .then( ( tutor ) => {
      res.render( 'showTutor', {
        tutor:tutor, title:"tutor"
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

exports.getPaticularTutor = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  Tutor.findOne({_id:id})
    .exec()
    .then( ( tutor ) => {
      res.render( 'tutorConfirm', {
        tutor:tutor, title:"tutor"
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
