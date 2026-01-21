import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import patientRoutes from "./modules/patients/patient.routes.js";
import referralRoutes from "./modules/referrals/referral.routes.js";
import referralDashboardRoutes from "./modules/referrals/referral.dashboard.routes.js";
import hospitalRoutes from "./modules/hospitals/hospital.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
    res.json({
        status: "ok",
        message: "Hospital Referral API running 🚑",
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/dashboard/referrals", referralDashboardRoutes);
app.use("/api/hospitals", hospitalRoutes);
export default app;
