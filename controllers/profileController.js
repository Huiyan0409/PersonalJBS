'use strict';
const User = require( '../models/User' );

exports.update = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)

  //update the User infor for the current user
  //find the current Users profile
  //change the fields using req.body.userName
  //then save them...

  User.find(res.locals.user._id)
  .exec()
  .then((p) => {
    console.log("just found a profile")
    console.dir(p)
    p.userName = req.body.userName
    p.profilePicURL = req.body.profilePicURL
    p.lastUpdate = new Date()
    p.save()
    .then(() => {
      res.redirect('/profile');
    })
  })
};
