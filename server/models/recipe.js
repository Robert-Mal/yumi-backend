const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    _userId: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    imageURL: String,
    tags: [String],
    favourite: Boolean,
    ingredients: [String],
    instructions: [String],
  },
  { versionKey: false }
);

module.exports = mongoose.model("recipe", recipeSchema);
