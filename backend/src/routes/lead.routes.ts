import { Router } from "express";
import * as leadController from "../controllers/lead.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Public route for external validation
router.post("/public/validate-lead", leadController.validateAndCreate);

// Protected routes for dashboard
router.get("/", protect, leadController.getMyLeads);

router.post("/manual", protect, leadController.manualValidateLead);

router.get("/source/:sourceId", protect, leadController.getLeadsBySource);

export default router;
