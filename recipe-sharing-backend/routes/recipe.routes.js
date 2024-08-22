import { Router } from "express";
import { CreateNewRecipe, GetAllRecipes, GetSingleRecipe, search, YourAddedRecipes, YourReviewedRecipes } from "../controllers/recipe.controller.js";
import { checkIsUserValid } from "../middlewares/all.middlewares.js";

const router = Router();

router.post("/create-new-recipe",checkIsUserValid, CreateNewRecipe);
router.get("/get-all-recipe",GetAllRecipes);
router.post("/get-single-recipe", GetSingleRecipe);
router.post("/your-added-recipes",checkIsUserValid, YourAddedRecipes);
router.post("/your-reviewed-recipes",checkIsUserValid, YourReviewedRecipes);
router.post("/search", search);

export default router;