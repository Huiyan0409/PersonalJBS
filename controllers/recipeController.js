'use strict';
const Recipe = require( '../models/Recipe' );

exports.saveRecipe = ( req, res ) => {
  let newRecipe = new Recipe( {
    name: req.body.name,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    author: req.user.googlename,
    userId: req.user._id,
    createdAt: new Date()
  } )


  newRecipe.save()
    .then( () => {
      //console.log("saving the comment")
      res.redirect( '/recipes' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.getAllRecipes = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Recipe.find({}).sort({createdAt: -1})
    .exec()
    .then( ( recipes ) => {
      //console.log('found skills')
      //console.dir(tutorComments)

      res.render( 'recipes', {
        recipes: recipes,title:"recipes"
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

  exports.deleteRecipe = (req, res) => {
    let deleteId = req.body.delete
    if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
      Recipe.deleteOne({_id:deleteId})
      .exec()
      .then(()=>{res.redirect('back')})
      .catch((error)=>{res.send(error)})
    } else if (typeof(deleteId)=='object'){
      Recipe.deleteMany({_id:{$in:deleteId}})
      .exec()
      .then(()=>{res.redirect('back')})
      .catch((error)=>{res.send(error)})
    } else if (typeof(deleteId)=='undefined'){
      //console.log("This is if they didn't select a skill")
      res.redirect('back')
    } else {
      //console.log("This shouldn't happen!")
      res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
    }
  };
