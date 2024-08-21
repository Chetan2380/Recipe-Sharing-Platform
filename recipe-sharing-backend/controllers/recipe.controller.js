import Recipe from "../models/recipe.model.js";

export const CreateNewRecipe = async (req, res) => {
    try {
      const { title, ingredients, instructions, cookingTime, category, cuisine, image } = req.body.recipeData;
      const { userId } = req.body;
      console.log(userId)
      if (!title || !ingredients || !instructions || !cookingTime || !category || !cuisine || !image || !userId) {
        return res.json({ success: false, error: "All fields are required." });
      }
      const isRecipeExist = await Recipe.findOne({
        title,
        category,
        creatorId: userId,
      });
      if (isRecipeExist) {
        return res.json({ success: false, error: "Recipe is already exists." });
      }
  
      const newRecipe = new Recipe({
        title: title,
        ingredients: ingredients,
        instructions: instructions,
        cookingTime: cookingTime,
        category:category,
        cuisine:cuisine,
        image:image,
        creatorId: userId,
      });
      await newRecipe.save();
  
      return res.json({
        success: true,
        message: "Recipe successfully created.",
      });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };

  export const GetAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      res.json({ success: true, recipes });
    } catch (error) {
      return res.json({ error, success: false });
    }
  };

  export const search = async (req, res) => {
    try {
      const { searchedWord } = req.body;
  
      const searchedrecipes = await Recipe.find({
        $or:[{ingredients: { $regex: searchedWord, $options: "i" }}]
        
      });
      res.json({ success: true, searchedrecipes });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };