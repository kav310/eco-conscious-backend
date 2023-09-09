const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipeById );
router.get('/categories', recipeController.getCategories );
router.get('/recipes/:category', recipeController.getRecipesByCategories);
router.get('/veganIngredients', recipeController.getAllIngredients)
router.get('/ingredientsByCategories', recipeController.getIngredientsByCategories)

module.exports = router;
