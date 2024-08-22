import { Router } from "express";
import { getRecipesByCuisines } from "../controllers/recipecategory.controller.js";

const router = Router();

router.get("/maharashtrian-recipes", getRecipesByCuisines);
router.get("/gujarati-recipes", getRecipesByCuisines);
router.get("/punjabi-recipes", getRecipesByCuisines);
router.get("/rajasthani-recipes", getRecipesByCuisines);
router.get("/south-indian-recipes", getRecipesByCuisines);
router.get("/north-east-recipes", getRecipesByCuisines);


export default router;