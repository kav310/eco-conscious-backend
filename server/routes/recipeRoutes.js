const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipeById );
router.get('/categories', recipeController.getCategories );
router.get('/recipes/:category', recipeController.getRecipesByCategories);

module.exports = router;
