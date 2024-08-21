import mongoose, { model, Schema, Types } from "mongoose";

const recipeSchema = new Schema({
    title: String,
    ingredients: String,
    instructions: String,
    cookingTime: String,
    category: String,
    cuisine: String,
    image:String,
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });
  
  const Recipe = model("Recipe", recipeSchema);
  
  export default Recipe;