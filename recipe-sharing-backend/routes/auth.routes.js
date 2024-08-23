import { Router } from "express";
import { getCurrentUser, Login, Logout, Register, updateProfile } from "../controllers/auth.controller.js";

const router = Router();
router.post("/register",Register);
router.post("/login",Login);
router.post("/update-profile",updateProfile);
router.get('/get-current-user', getCurrentUser)
router.post("/logout",Logout);

export default router;