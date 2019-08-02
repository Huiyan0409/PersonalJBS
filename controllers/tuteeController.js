'use strict';
const Tutee = require( '../models/tutee' );

exports.saveTutee = ( req, res ) => {
  const goBackURL = '/tuteeRegister'
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to become a tuteeRegister.")
  }
  let newTutee = new Tutee(
    {
      userId: res.locals.user._id,
      userName:res.locals.user.userName,
      introduction: req.body.introduction,
      payment: req.body.payment,
      createdAt: new Date(),
      subject: req.body.subject,
      email: req.body.email
    }
  )
  newTutee.save()
  .then( () => {
    res.redirect( '/showTutees');
  } )
  .catch( error => {
    res.send( error );
  } );
};

exports.getAllTutee = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Tutee.find({}).sort({createdAt: -1})
    .exec()
    .then( ( tutees ) => {
      //console.log('found skills')
      //console.dir(tutorComments)

      res.render( 'showTutees', {
        tutees: tutees,title:"tutees"
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
exports.getOneTutee = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  Tutee.findOne({_id:id})
    .exec()
    .then( ( tutee ) => {
      res.render( 'showTutee', {
        tutee:tutee, title:"tutee"
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

exports.getPaticularTutee = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  Tutee.findOne({_id:id})
    .exec()
    .then( ( tutee ) => {
      res.render( 'tuteeConfirm', {
        tutee:tutee, title:"tutee"
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
