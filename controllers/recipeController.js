'use strict';
const Recipe = require( '../models/Recipe' );

exports.saveRecipe = ( req, res ) => {
  let newRecipe = new Recipe( {
    name: req.body.name,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    author: req.user._id,
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
