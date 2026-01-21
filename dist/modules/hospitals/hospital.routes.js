import { Router } from "express";
import { getSecondaryHospitals } from "../../modules/hospitals/hospital.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
const router = Router();
router.get("/secondary", authenticate, getSecondaryHospitals);
export default router;
