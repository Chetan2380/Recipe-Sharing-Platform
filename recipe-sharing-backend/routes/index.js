import { Router } from "express";
import AuthRoutes from "../routes/auth.routes.js"
import AdminRoutes from "../routes/admin.routes.js"
import RecipeRoutes from "../routes/recipe.routes.js"

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/recipe", RecipeRoutes);

export default router;