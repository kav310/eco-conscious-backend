require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const VeganIngredients = require('../models/Ingredients')
const {v4: uuidv4} = require("uuid");


module.exports = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.find({});
            if (!recipes) {
                throw new Error("There is no items");
            } else {
                res.json(recipes);
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    addRecipes: async (req, res) => {
        try {
            const {name, description, ingredients, cookingInstructions, image, category} = req.body;
            const userId = req.user.id; // Get the user ID from the authenticated user

            const newRecipe = new Recipe({
                name,
                description,
                ingredients,
                cookingInstructions,
                image,
                category,
                user: userId, // Associate the recipe with the user
            });

            const savedRecipe = await newRecipe.save();
            res.status(201).json(savedRecipe);
        } catch (error) {
            res.status(500).json({error: 'An error occurred while adding the recipe.'});
        }
    },

    editRecipes: async (req, res) => {
        try {
            const {name, description, ingredients, cookingInstructions, image, category} = req.body;
            const recipeId = req.params.id;
            const userId = req.user.id; // Get the user ID from the authenticated user

            const updatedRecipe = await Recipe.findOneAndUpdate(
                {_id: recipeId, user: userId}, // Only update if the recipe belongs to the authenticated user
                {
                    name,
                    description,
                    ingredients,
                    cookingInstructions,
                    image,
                    category,
                },
                {new: true}
            );

            if (!updatedRecipe) {
                return res.status(404).json({error: 'Recipe not found or unauthorized'});
            }

            res.status(200).json(updatedRecipe);
        } catch (error) {
            res.status(500).json({error: 'An error occurred while editing the recipe.'});
        }
    },

    deleteRecipes: async (req, res) => {
        try {
            const recipeId = req.params.id;
            const userId = req.user.id; // Get the user ID from the authenticated user

            const deletedRecipe = await Recipe.findOneAndRemove({_id: recipeId, user: userId});

            if (!deletedRecipe) {
                return res.status(404).json({error: 'Recipe not found or unauthorized'});
            }

            res.status(200).json({message: 'Recipe deleted successfully'});
        } catch (error) {
            res.status(500).json({error: 'An error occurred while deleting the recipe.'});
        }
    },

    getRecipeById: async (req, res) => {
        try {
            let recipeId = req.params.id;
            const recipe = await Recipe.findById(recipeId);
            if (!recipeId) {
                throw new Error("There is no recipeId");
            } else {
                res.json(recipe);
            }
        } catch (error) {
            res.status(500).send({message: error.message || "Error Occured"});
        }
    },

    getCategories: async (req, res) => {
        try {
            const categories = await Category.find({});
            if (!categories) {
                throw new Error("There is no recipeId");
            } else {
                res.json(categories);
            }
        } catch (error) {
            res.status(500).send({message: error.message || "Error Occured"});
        }
    },

    getRecipesByCategories: async (req, res) => {
        try {
            const selectedCategory = req.params.category
            console.log(selectedCategory)
            const categories = await Recipe.find({"category": selectedCategory});
            if (!categories) {
                throw new Error("There is no recipeId");
            } else {
                res.json(categories);
            }
        } catch (error) {
            res.status(500).send({message: error.message || "Error Occured"});
        }
    },


    getAllIngredients: async (req, res) => {
        try {
            const ingredients = await VeganIngredients.find({});
            if (!ingredients) {
                throw new Error("There is no items");
            } else {
                res.json(ingredients);
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    getIngredientsByCategories: async (req, res) => {
        try {
            // Use Mongoose to query the database and group data by category
            const data = await VeganIngredients.aggregate([
                {
                    $group: {
                        _id: '$category',
                        ingredients: {$push: '$name'},
                    },
                },
            ]);

            res.json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
};



