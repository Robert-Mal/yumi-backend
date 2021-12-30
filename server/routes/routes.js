const express = require("express");
const router = express.Router();
const RecipeAPI = require("../controllers/recipes");

router.post("/recipe-create", RecipeAPI.createRecipe);
router.get("/recipe-read", RecipeAPI.readRecipes);
router.put("/recipe-update", RecipeAPI.updateRecipe);
router.delete("/recipe-delete", RecipeAPI.deleteRecipe);

module.exports = router;
