const mongoose = require('mongoose');


// Create a schema for the main document
const veganIngredientsSchema = new mongoose.Schema({
    name: String,
    category: String,
});

// Create a model for the vegan ingredients
const VeganIngredients = mongoose.model('VeganIngredients', veganIngredientsSchema);

module.exports = VeganIngredients;
