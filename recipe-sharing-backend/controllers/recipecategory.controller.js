import Recipe from "../models/recipe.model.js";

export const getRecipesByCategory = async (req, res) => {
    try {
        const { category } = req.query; // Use query parameters
        if (!category) {
            return res.json({ success: false, error: "Category is required." });
        }
        const recipes = await Recipe.find({ category: category });
        res.json({ success: true, recipes });
    } catch (error) {
        console.log(error, "error");
        return res.json({ error: error.message, success: false });
    }
};


export const getRecipesByCuisines = async (req, res) => {
    try {
        const { cuisine } = req.query; // Use query parameters
        if (!cuisine) {
            return res.json({ success: false, error: "cuisine is required." });
        }
        const recipes = await Recipe.find({ cuisine: cuisine });
        res.json({ success: true, recipes });
    } catch (error) {
        console.log(error, "error");
        return res.json({ error: error.message, success: false });
    }
};