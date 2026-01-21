import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { requireHospitalType } from "../../middlewares/role.middleware.js";
import { primaryDashboard, secondaryDashboard, } from "./referral.dashboard.controller.js";
const router = Router();
router.use(authenticate);
router.get("/primary", requireHospitalType("PRIMARY"), primaryDashboard);
router.get("/secondary", requireHospitalType("SECONDARY"), secondaryDashboard);
export default router;
