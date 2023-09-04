require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
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
    }
};

// async function insertDymmyCategoryData(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Thai",
//       },
//       {
//         "name": "American",
//       },
//       {
//         "name": "Chinese",
//       },
//       {
//         "name": "Mexican",
//       },
//       {
//         "name": "Indian",
//       },
//       {
//         "name": "Spanish",
//       },
//       {
//         "name": "Greek"
//       },
//       {
//         "name": "French"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
//
// insertDymmyCategoryData();


// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       {
//         "name": 'Vegan Tofu Stir-Fry',
//         "description": 'A quick and healthy vegan stir-fry with tofu, vegetables, and a savory sauce.',
//         "ingredients": ['tofu', 'bell peppers', 'broccoli', 'soy sauce', 'sesame oil'],
//         "cookingInstructions": '1. Cut tofu into cubes and stir-fry until golden.\n2. Add bell peppers and broccoli, stir-fry until tender.\n3. Drizzle with soy sauce and sesame oil, toss well.\n4. Serve hot over cooked rice or noodles.',
//         "image": 'https://images.unsplash.com/photo-1615366105533-5b8f3255ea5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
//         "category": 'Chinese'
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
//
// insertDymmyRecipeData();
