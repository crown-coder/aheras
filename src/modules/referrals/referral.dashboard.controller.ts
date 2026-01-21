import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import {
  primarySummary,
  primaryRecentReferrals,
  secondarySummary,
  secondaryRecentReferrals,
} from "./referral.dashboard.service.js";

export const primaryDashboard = async (req: AuthRequest, res: Response) => {
  const hospitalId = req.user!.userId;

  const [summary, recent] = await Promise.all([
    primarySummary(hospitalId),
    primaryRecentReferrals(hospitalId),
  ]);

  res.json({ summary, recent });
};

export const secondaryDashboard = async (req: AuthRequest, res: Response) => {
  const hospitalId = req.user!.userId;

  const [summary, recent] = await Promise.all([
    secondarySummary(hospitalId),
    secondaryRecentReferrals(hospitalId),
  ]);

  res.json({ summary, recent });
};
