import { Router } from "express";
import { getRecipesByCategory } from "../controllers/recipecategory.controller.js";

const router = Router();

router.get("/veg-recipes", getRecipesByCategory);
router.get("/non-veg-recipes", getRecipesByCategory);
router.get("/vegan-recipes", getRecipesByCategory);
router.get("/special-recipes", getRecipesByCategory);
router.get("/healthy-recipes", getRecipesByCategory);

export default router;