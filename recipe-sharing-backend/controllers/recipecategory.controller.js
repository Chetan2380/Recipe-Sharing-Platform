import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

export const getRecipesByCategory = async (req, res) => {
    try {
      const { category } = req.query;
      if (!category) {
        return res.json({ success: false, error: "Category is required." });
      }
  
      
      const recipesWithRatings = await Recipe.aggregate([
        {
          $match: { category: category } 
        },
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
    } catch (error) {
      console.error(error); 
      return res.json({ error: error.message, success: false });
    }
  };
  


  export const getRecipesByCuisines = async (req, res) => {
    try {
      const { cuisine } = req.query;
      if (!cuisine) {
        return res.json({ success: false, error: "Cuisine is required." });
      }
  
      
      const recipesWithRatings = await Recipe.aggregate([
        {
          $match: { cuisine: cuisine } 
        },
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
    } catch (error) {
      console.error(error);
      return res.json({ error: error.message, success: false });
    }
  };
  