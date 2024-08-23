import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

export const getRecipesByCategory = async (req, res) => {
    try {
        const { category } = req.query; 
        if (!category) {
            return res.json({ success: false, error: "Category is required." });
        }
        const recipes = await Recipe.find({ category: category });
        const recipesWithRatings = await Promise.all(recipes.map(async (recipe) => {
            const reviews = await Review.find({ recipeId: recipe._id });
            const averageRating = reviews.length > 0 
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
                : 0;
            return {
                ...recipe._doc,
                averageRating: averageRating.toFixed(1) 
            };
        }));
    
          res.json({ success: true, recipes: recipesWithRatings });
        // res.json({ success: true, recipes });
    } catch (error) {
        console.log(error, "error");
        return res.json({ error: error.message, success: false });
    }
};


export const getRecipesByCuisines = async (req, res) => {
    try {
        const { cuisine } = req.query; 
        if (!cuisine) {
            return res.json({ success: false, error: "cuisine is required." });
        }
        const recipes = await Recipe.find({ cuisine: cuisine });
        const recipesWithRatings = await Promise.all(recipes.map(async (recipe) => {
            const reviews = await Review.find({ recipeId: recipe._id });
            const averageRating = reviews.length > 0 
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
                : 0;
            return {
                ...recipe._doc,
                averageRating: averageRating.toFixed(1) 
            };
        }));
    
          res.json({ success: true, recipes: recipesWithRatings });
        // res.json({ success: true, recipes });
    } catch (error) {
        console.log(error, "error");
        return res.json({ error: error.message, success: false });
    }
};