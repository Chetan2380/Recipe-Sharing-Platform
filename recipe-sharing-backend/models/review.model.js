import mongoose, { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true }
});

const Review = model("Review", reviewSchema);

export default Review;