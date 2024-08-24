import { Router } from "express";
import { GetAllUsers, getCurrentUser, Login, Logout, Register, updateProfile } from "../controllers/auth.controller.js";

const router = Router();
router.post("/register",Register);
router.post("/login",Login);
router.post("/update-profile",updateProfile);
router.get('/get-current-user', getCurrentUser)
router.post("/logout",Logout);
router.get('/users', GetAllUsers); 

export default router;