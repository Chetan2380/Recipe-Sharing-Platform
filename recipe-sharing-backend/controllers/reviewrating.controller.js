import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

export const ReviewRating = async (req, res) => {
    try {
        const { rating, review } = req.body.reviewData;
        const { userId, recipeId } = req.body;
        console.log(userId)
        console.log(recipeId)
        if (!rating || !review) {
          return res.json({ success: false, error: "All fields are required." });
        }
        if (rating < 1 || rating > 5) {
          return res.json({ success: false, error: "Rating must be between 1 and 5." });
      }
        const isReviewExist = await Review.findOne({
            userId: userId,
          recipeId:recipeId
        });
        if (isReviewExist) {
          return res.json({ success: false, error: "Review have already been submitted." });
        }
    
        const newReview = new Review({
            rating:rating,
            review:review,
            userId: userId,
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
      const reviews = await Review.find({ recipeId: recipeId }).populate('userId', 'name'); ;
      console.log(reviews)
      return res.json({ success: true, reviews });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };
