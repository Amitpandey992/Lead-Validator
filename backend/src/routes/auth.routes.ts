import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authController.register);

router.post("/login", authController.login);
router.get("/verify-email", authController.verify);
router.post("/resend-verify", authController.resendVerify);

export default router;
