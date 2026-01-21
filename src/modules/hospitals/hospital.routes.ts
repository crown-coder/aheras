import { Router } from "express";
import { getSecondaryHospitals } from "../../modules/hospitals/hospital.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/secondary", authenticate, getSecondaryHospitals);

export default router;
