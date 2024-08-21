import { Router } from "express";
import { CreateNewRecipe, GetAllRecipes, search } from "../controllers/recipe.controller.js";
import { checkIsUserValid } from "../middlewares/all.middlewares.js";

const router = Router();

router.post("/create-new-recipe",checkIsUserValid, CreateNewRecipe);
router.get("/get-all-recipe",GetAllRecipes);
router.post("/search", search);

export default router;