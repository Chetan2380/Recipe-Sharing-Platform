import { Router } from "express";
import { AddedReviewsByRecipes, ReviewRating } from "../controllers/reviewrating.controller.js";
import { checkIsUserValid } from "../middlewares/all.middlewares.js";

const router = Router();

router.post("/add-review/:id",checkIsUserValid, ReviewRating);
router.post("/added-reviews", AddedReviewsByRecipes);

export default router;