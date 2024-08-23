import Recipe from "../models/recipe.model.js";
import Review from "../models/review.model.js";

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

      const recipesWithRatings = await Promise.all(recipes.map(async (recipe) => {
        const reviews = await Review.find({ recipeId: recipe._id });
        const averageRating = reviews.length > 0 
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
            : 0;
        return {
            ...recipe._doc, // Spread the existing recipe data
            averageRating: averageRating.toFixed(1) // Round to one decimal place
        };
    }));

      res.json({ success: true, recipes: recipesWithRatings });
    } catch (error) {
      return res.json({ error, success: false });
    }
  };

  export const GetSingleRecipe = async (req, res) => {
    try {
      const { recipeId } = req.body;
      if (!recipeId) {
        return res.json({ success: false, error: "Recipe ID is required." });
      }
      
      const recipe = await Recipe.findById(recipeId);
      res.json({ success: true, recipe });
    } catch (error) {
      return res.json({ error, success: false });
    }
  };

  export const YourAddedRecipes = async (req, res) => {
    try {
      const { userId } = req.body;
      const recipes = await Recipe.find({ creatorId: userId });
      return res.json({ success: true, recipes });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };

  export const YourReviewedRecipes = async (req, res) => {
    try {
      const { userId } = req.body;
      // const recipes = await Review.find({ userId: userId });
      const reviews = await Review.find({ userId: userId })
            .populate('recipeId', 'title ingredients instructions cookingTime category cuisine image')
            .populate('userId', 'name');
      return res.json({ success: true, reviews });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
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


  export const GetLatestRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({})
            .sort({ createdAt: -1 })
            .limit(4); // Limit to the latest 4 recipes
        
        const recipesWithRatings = await Promise.all(recipes.map(async (recipe) => {
            const reviews = await Review.find({ recipeId: recipe._id });
            const averageRating = reviews.length > 0 
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
                : 0;
            return {
                ...recipe._doc, // Spread the existing recipe data
                averageRating: averageRating.toFixed(1) // Round to one decimal place
            };
        }));

        res.json({ success: true, recipes: recipesWithRatings });
    } catch (error) {
        res.json({ error, success: false });
    }
};
