import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import patientRoutes from "./modules/patients/patient.routes";
import referralRoutes from "./modules/referrals/referral.routes";
import referralDashboardRoutes from "./modules/referrals/referral.dashboard.routes";
import hospitalRoutes from "./modules/hospitals/hospital.routes";

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
