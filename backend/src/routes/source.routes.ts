import { Router } from "express";
import * as sourceController from "../controllers/source.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", sourceController.create);
router.get("/", sourceController.list);

export default router;
