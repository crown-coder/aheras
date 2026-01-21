import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { requireHospitalType } from "../../middlewares/role.middleware.js";
import { create, outgoing, incoming, accept, reject, } from "./referral.controller.js";
const router = Router();
router.use(authenticate);
/* PRIMARY */
router.post("/", requireHospitalType("PRIMARY"), create);
router.get("/outgoing", requireHospitalType("PRIMARY"), outgoing);
/* SECONDARY */
router.get("/incoming", requireHospitalType("SECONDARY"), incoming);
router.post("/:id/accept", requireHospitalType("SECONDARY"), accept);
router.post("/:id/reject", requireHospitalType("SECONDARY"), reject);
export default router;
