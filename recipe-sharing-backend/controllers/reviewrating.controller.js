import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

export const ReviewRating = async (req, res) => {
    try {
        const { rating, review } = req.body.reviewData;
        const { userId, recipeId } = req.body;
        console.log(userId)
        console.log(recipeId)
        if (!rating || !review || !userId || !recipeId) {
          return res.json({ success: false, error: "All fields are required." });
        }
        const isRecipeExist = await Review.findOne({
          rating,
          review,
          reviewerId: userId,
          recipeId:recipeId
        });
        if (isRecipeExist) {
          return res.json({ success: false, error: "Review have already been submitted." });
        }
    
        const newReview = new Review({
            rating:rating,
            review:review,
            reviewerId: userId,
            recipeId:recipeId
        });
        await newReview.save();
    
        return res.json({
          success: true,
          message: "Review submitted successfully.",
        });
      } catch (error) {
        console.log(error, "error");
        return res.json({ error: error, success: false });
      }
};


export const AddedReviewsByRecipes = async (req, res) => {
    try {
      const { recipeId } = req.body;
      const reviews = await Review.find({ recipeId: recipeId }).populate('reviewerId', 'name'); ;
      console.log(reviews)
      return res.json({ success: true, reviews });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };
