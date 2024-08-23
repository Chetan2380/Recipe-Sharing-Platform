import mongoose, { model, Schema, Types } from "mongoose";

const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: String, required: true },
  category: { type: String, required: true },
  cuisine: { type: String, required: true },
  image: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
  
  const Recipe = model("Recipe", recipeSchema);
  
  export default Recipe;