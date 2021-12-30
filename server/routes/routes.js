const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const UserAPI = require("../apis/users");
const RecipeAPI = require("../apis/recipes");

router.put("/user-update", UserAPI.updateUser);
router.delete("/user-delete", UserAPI.deleteUser);

router.post("/recipe-create", RecipeAPI.createRecipe);
router.post("/recipe-read", RecipeAPI.readRecipes);
router.put("/recipe-update", RecipeAPI.updateRecipe);
router.delete("/recipe-delete", RecipeAPI.deleteRecipe);
router.post("/recipe-by-id", RecipeAPI.readRecipe);

router.post("/favourite-read", RecipeAPI.readFavourites);

// router.post("/user-create", API.createUser);
// router.get("/user-read", API.readUserByEmail);
// router.put("/user-update", API.updateUser);
// router.delete("/user-delete", API.deleteUser);

// router.post("/recipe-create", API.createRecipe);
// router.get("/recipe-read", API.readRecipe);
// router.put("/recipe-update", API.updateRecipe);
// router.delete("/recipe-delete", API.deleteRecipe);

// router.get("/recipes-read", API.readRecipes);

// router.put("/tags-update", API.updateTags);

// router.post("/ingredient-create", API.createIngredient);
// router.put("/ingredient-update", API.updateIngredient);
// router.delete("/ingredient-delete", API.deleteIngredient);

// router.get("/ingredients-read", API.readIngredients);

// router.get("/ingredients-list", API.getIngredientsList);
// router.get("/ingredient-information", API.getIngredientInformation);

module.exports = router;
