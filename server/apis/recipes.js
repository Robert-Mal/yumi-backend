const Recipe = require("../models/recipe");

module.exports = class RecipeAPI {
  static async createRecipe(req, res) {
    const {
      _userId,
      name,
      description,
      imageURL,
      tags,
      favourite,
      ingredients,
      instructions,
    } = req.body;
    const recipe = new Recipe({
      _userId: _userId,
      name: name,
      description: description,
      imageURL: imageURL,
      tags: tags,
      favourite: favourite,
      ingredients: ingredients,
      instructions: instructions,
    });

    recipe
      .save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readRecipes(req, res) {
    Recipe.find({ _userId: req.body._userId })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  }

  static async readRecipe(req, res) {
    Recipe.findOne({ _id: req.body._id })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async updateRecipe(req, res) {
    const {
      _id,
      name,
      description,
      imageURL,
      tags,
      favourite,
      ingredients,
      instructions,
    } = req.body;
    Recipe.findByIdAndUpdate(
      { _id },
      {
        name: name,
        description: description,
        imageURL: imageURL,
        tags: tags,
        favourite: favourite,
        ingredients: ingredients,
        instructions: instructions,
      }
    )
      .then((result) =>
        res.send({
          _id,
          name,
          description,
          imageURL,
          tags,
          favourite,
          ingredients,
          instructions,
        })
      )
      .catch((err) => console.log(err));
  }

  static async deleteRecipe(req, res) {
    console.log(req.body);
    Recipe.findByIdAndDelete({ _id: req.body._id })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readFavourites(req, res) {
    Recipe.find({ _userId: req.body._userId, favourite: true })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }
};
