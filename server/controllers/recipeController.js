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
                        ingredients: { $push: '$name' },
                    },
                },
            ]);

            res.json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};



