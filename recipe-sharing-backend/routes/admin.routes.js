import { Router } from "express";
import { LoginAdmin, RegisterAdmin } from "../controllers/admin.controller.js";

const router=Router();

router.post("/register-admin", RegisterAdmin);
router.post("/login-admin", LoginAdmin);

export default router;