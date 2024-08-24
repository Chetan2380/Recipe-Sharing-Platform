import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

export const getRecipesByCategory = async (req, res) => {
    try {
        const { category } = req.query; 
        if (!category) {
            return res.json({ success: false, error: "Category is required." });
        }
        const recipes = await Recipe.find({ category: category });
        const recipesWithRatings = await Recipe.aggregate([
            {
              $lookup: {
                from: 'reviews', 
                localField: '_id',
                foreignField: 'recipeId',
                as: 'reviews'
              }
            },
            {
              $addFields: {
                averageRating: {
                  $cond: {
                    if: { $gt: [{ $size: '$reviews' }, 0] },
                    then: { $divide: [{ $sum: '$reviews.rating' }, { $size: '$reviews' }] },
                    else: 0
                  }
                }
              }
            },
            {
              $project: {
                reviews: 0 
              }
            }
          ]);
    
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
        const recipesWithRatings = await Recipe.aggregate([
            {
              $lookup: {
                from: 'reviews', 
                localField: '_id',
                foreignField: 'recipeId',
                as: 'reviews'
              }
            },
            {
              $addFields: {
                averageRating: {
                  $cond: {
                    if: { $gt: [{ $size: '$reviews' }, 0] },
                    then: { $divide: [{ $sum: '$reviews.rating' }, { $size: '$reviews' }] },
                    else: 0
                  }
                }
              }
            },
            {
              $project: {
                reviews: 0 
              }
            }
          ]);
    
          res.json({ success: true, recipes: recipesWithRatings });
        // res.json({ success: true, recipes });
    } catch (error) {
        console.log(error, "error");
        return res.json({ error: error.message, success: false });
    }
};