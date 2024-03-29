const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const {registerUser, loginUser, getUserProfile} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", validateToken, getUserProfile);
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipeById);
router.get('/categories', recipeController.getCategories);
router.get('/recipes/:category', recipeController.getRecipesByCategories);
router.post('/addRecipe', validateToken, recipeController.addRecipes);
router.put('/editRecipe/:id', validateToken, recipeController.editRecipes);
router.delete('/deleteRecipe/:id', validateToken, recipeController.deleteRecipes);

router.get('/veganIngredients', recipeController.getAllIngredients);
router.get('/ingredientsByCategories', recipeController.getIngredientsByCategories);

module.exports = router;
